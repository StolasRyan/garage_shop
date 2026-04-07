'use client'

const OTPResendCode = ({
    canResend,
    timeLeft,
    onResendAction
}:{
    canResend: boolean,
    timeLeft:number,
    onResendAction:()=>void
}) => {
  return !canResend ? (
          <p className="text-gray-500 text-xs text-center">
            We can resend code in{" "}
            <span className="font-bold">{timeLeft} seconds</span>
          </p>
        ) : (
          <button
            onClick={onResendAction}
            disabled={!canResend}
            className={`text-xs underline cursor-pointer text-center ${canResend ? "text-green-500" : "text-gray-400 cursor-not-allowed"}`}
          >
            Resend
          </button>
        )
}

export default OTPResendCode


