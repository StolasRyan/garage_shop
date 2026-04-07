"use client";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import AlertMessage from "../AlertMessage";
import { authClient } from "@/app/lib/auth-client";
import PhoneVerifyView from "./PhoneVerifyView";
import EditButton from "./EditButton";
import PhoneEditView from "./PhoneEditView";
import { CONFIG } from "@/config/config";
import useTimer from "@/app/hooks/useTimer";
import ProfilePhoneInput from "./ProfilePhoneInput";

const ProfilePhoneSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [verificationStep, setVerificationStep] = useState<"edit" | "verify">(
    "edit",
  );
  const [error, setError] = useState<string>("");
  const [code, setCode] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(CONFIG.MAX_ATTEMPTS);
  const { timeLeft, canResend, startTimer } = useTimer(CONFIG.TIMEOUT_PERIOD);
  const { user, fetchUserData } = useAuthStore();

  const isPhoneRegistered = user?.phoneNumberVerified === true;
  const currentPhone = user?.phoneNumber || "";

  useEffect(() => {
    if (user) {
      setNewPhoneNumber(currentPhone);
    }
  }, [currentPhone, user]);

  const handlePhoneChange = (value:string) => {
    setNewPhoneNumber(value);
    setError("");
  };

  const handleCancel = () => {
    setNewPhoneNumber(currentPhone);
    setIsEditing(false);
    setVerificationStep("edit");
    setError("");
    setCode("");
    setAttemptsLeft(CONFIG.MAX_ATTEMPTS);
  };

    const updatePhoneDirectly = async () => {
    const response = await fetch("/api/auth/update-phone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber: newPhoneNumber, userId: user?.id }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      return;
    }

    await fetchUserData();
    alert("Phone number updated successfully.");
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!user) return;

    if (newPhoneNumber === currentPhone) {
      setError("New phone is the same as the current phone");
      return;
    }
    setIsSaving(true);
    setError("");

    try {
      if (!isPhoneRegistered) {
        //<=IMPORTANT! check users registration settings
        await updatePhoneDirectly();
      } else {
        await sendVerificationCode();
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update phone", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error happened while updating phone");
      }
    } finally {
      setIsSaving(false);
    }
  };



  const sendVerificationCode = async () => {
    setIsSendingOtp(true);
    setError("");

    try {
      await authClient.phoneNumber.sendOtp(
        { phoneNumber: currentPhone },
        {
          onSuccess: () => {
            setIsSendingOtp(false);
            setVerificationStep("verify");
            startTimer();
          },
          onError: (ctx) => {
            setIsSendingOtp(false);
            setError(ctx.error.message || "Failed to send SMS");
          },
        },
      );
      return true;
    } catch (error) {
      setIsSaving(false);
      setError(error instanceof Error ? error.message : "Unknown error");
      return false;
    }
  };

  const verifyCodeAndUpdatePhone = async () => {
    if (code.length !== 4) return;
    setIsSaving(true);

    try {
      const { error: verifyError } = await authClient.phoneNumber.verify({
        phoneNumber: currentPhone,
        code,
      });
      if (verifyError) throw verifyError;

      updatePhoneDirectly();
      setVerificationStep("edit");
      setCode("");
      setAttemptsLeft(CONFIG.MAX_ATTEMPTS);
    } catch (error) {
      handleVerificationError(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleVerificationError = (error: unknown) => {
    console.error("Verification error:", error);
    setCode("");
    setAttemptsLeft((prev) => prev - 1);
    if (attemptsLeft <= 1) {
      setError("No attempts left. Try again.");
      setTimeout(() => handleCancel(), 2000);
    } else {
      setError(`Attempts left: ${attemptsLeft - 1}`);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    await sendVerificationCode();
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <h3 className="text-lg font-semibold text-gray-600">Phone</h3>
        {verificationStep === "edit" && !isEditing ? (
          <EditButton onEdit={() => setIsEditing(true)} />
        ) : verificationStep === "edit" && isEditing ? (
          <PhoneEditView
            onCancel={handleCancel}
            onSave={handleSave}
            isSaving={isSaving}
            isSendingOTP={isSendingOtp}
          />
        ) : verificationStep === "verify" ? (
          <PhoneEditView
            onCancel={handleCancel}
            isSendingOTP={isSendingOtp}
            isSaving={isSaving}
            isVerificationMode={true}
          />
        ) : null}
      </div>

      <ProfilePhoneInput value={newPhoneNumber} onChange={handlePhoneChange} disabled={!isEditing || verificationStep === 'verify'}/>

      {isEditing && !isPhoneRegistered && (
        <AlertMessage
          type="success"
          message="You can change your phone number without verification."
        />
      )}
      {isEditing && isPhoneRegistered && (
        <AlertMessage
          type="waring"
          message="To change phone number needed verification with SMS code."
        />
      )}
      {error && <AlertMessage type="error" message={error} />}
      {verificationStep === "verify" && (
        <PhoneVerifyView
          currentPhone={currentPhone}
          code={code}
          isSaving={isSaving}
          onCodeChange={(value) => {
            setCode(value.replace(/\D/g, ""));
            setError("");
          }}
          onVerify={verifyCodeAndUpdatePhone}
          canResend={canResend}
          timeLeft={timeLeft}
          onResendCode={handleResendCode}
        />
      )}
    </div>
  );
};

export default ProfilePhoneSettings;
