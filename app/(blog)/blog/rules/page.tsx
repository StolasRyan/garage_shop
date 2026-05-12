import { getAdminContact } from "@/actions/getAdminContact";
import {
  Shield,
  AlertTriangle,
  Heart,
  MessageSquare,
  Users,
  Flag,
  Ban,
  Link2,
  Globe,
  Clock,
  Star,
  Phone,
  Mail,
  ThumbsDown,
  HelpCircle,
  Info,
} from "lucide-react";

export default async function CommunityRulesPage() {
  const adminContact = await getAdminContact();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-linear-to-r from-green-600 to-green-800 text-white rounded">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Comments rules</h1>
          </div>
          <p className="text-xl max-w-3xl text-green-50">
            We value every reader and strive to create a space for respectful
            and meaningful communication. Please adhere to these simple rules.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-start gap-4">
            <Heart className="w-8 h-8 text-green-600 shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold mb-3">About community</h2>
              <p className="text-gray-600 leading-relaxed">
                Our blog is a place to exchange opinions, experiences, and
                ideas. We welcome constructive discussions, diverse
                perspectives, and friendly communication. Every comment makes
                our blog better, provided it is written with respect for the
                author and other readers.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Respect your interlocutors
                </h3>
                <p className="text-gray-600">
                  Treat other commenters the way you would like to be treated.
                  Constructive criticism is welcome, but personal insults are
                  not.
                </p>
                <div className="mt-3 text-sm text-gray-500 bg-gray-50 p-2 rounded">
                  <span className="font-medium">✓ Good:</span> &quot;I
                  don&rsquo;t agree with your point of view because...&quot;
                  <br />
                  <span className="font-medium">✗ Bad:</span> &quot;You are dont
                  understan anything about this topic!&quot;
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Ban className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">No hate speech</h3>
                <p className="text-gray-600">
                  Any form of insult, humiliation, bullying, or discrimination
                  (based on nationality, gender, religion, or any other grounds)
                  is prohibited.
                </p>
                <div className="mt-3 text-sm text-gray-500">
                  Such comments will be removed. And author will be banned.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">No spam</h3>
                <p className="text-gray-600">
                  Mass mailing of identical messages, advertising of third-party
                  resources, phishing links, and any other spam are prohibited.
                </p>
                <div className="mt-3 text-sm text-gray-500">
                  Exceptions are possible only by agreement with the
                  administration.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Be constructive</h3>
                <p className="text-gray-600">
                  Try to stay on topic, support your position, and avoid spam.
                </p>
                <div className="mt-3 text-sm text-gray-500">
                  Short comments like &quot;+&quot; or &quot;agree&quot; better
                  push like button.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Link2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Link publication</h3>
                <p className="text-gray-600">
                  If you share a link, be sure to explain what it is and why it
                  will be useful to other readers.
                </p>
                <div className="mt-3 text-sm text-gray-500">
                  Links to malicious and fraudulent sites are prohibited.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-500">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <ThumbsDown className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Don&rsquo;t stir up conflicts
                </h3>
                <p className="text-gray-600">
                  Provocations, trolling, and deliberately inciting conflicts
                  are prohibited. Please keep the discussion to the point, not
                  personal attacks.
                </p>
                <div className="mt-3 text-sm text-gray-500">
                  If you feel like the dialogue is turning into a conflict,
                  it&rsquo;s best to stop.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Important notes</h2>

          <div className="space-y-4">
            <div className="flex gap-3">
              <Globe className="w-5 h-5 text-green-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-medium">Languagee</h3>
                <p className="text-gray-600">
                  You can use any language you want to express your opinion.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-green-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-medium">Actuality</h3>
                <p className="text-gray-600">
                  Check the article&rsquo;s publication date. If the discussion
                  was concluded more than a year ago, it&rsquo;s best not to
                  reopen the old topic without a compelling reason.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Flag className="w-5 h-5 text-green-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-medium">Complaints</h3>
                <p className="text-gray-600">
                  If you see a comment that violates the rules, please use the
                  &quot;Report&quot; button. Moderators will review your
                  complaint within 24 hours.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Info className="w-5 h-5 text-green-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-medium">Copyright</h3>
                <p className="text-gray-600">
                  By publishing a comment, you confirm that the text was written
                  by you or that you have the rights to publish it. Plagiarism
                  is prohibited.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Star className="w-5 h-5 text-green-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-medium">Active participants</h3>
                <p className="text-gray-600">
                  Users who regularly leave meaningful comments can achieve
                  &quot;Active&quot; member status, which offers additional
                  benefits.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            Measures for violations
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="bg-orange-200 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <span className="font-medium">Warnings</span>
                <p className="text-gray-600">
                  For the first minor violation (for example, minor spam), the
                  moderator may issue a warning. The comment may be deleted.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="bg-orange-200 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <span className="font-medium">Temporary blocking</span>
                <p className="text-gray-600">
                  For repeated violations, access to comments will be restricted
                  for a period of 1 day to 1 month, depending on the severity of
                  the violation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="bg-orange-200 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <span className="font-medium">Permanent blocking</span>
                <p className="text-gray-600">
                  For serious violations (threats, incitement to violence,
                  dissemination of prohibited information, mass spam), the
                  account will be permanently blocked.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white rounded">
            <p className="text-sm text-gray-600 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <span>
                <strong>Important:</strong> Moderators always explain the reason
                for blocking. If you believe the blocking was in error, please
                contact us, and we&rsquo;ll look into the matter.
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Questions or complaints?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            If you have any questions about the rules, want to report a
            violation, or appeal a moderator&rquo;s actions, please contact us
            in any convenient way.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center w-full">
            <div className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 duration-300 inline-flex flex-col items-center gap-2 justify-center">
              <Flag className="w-7 h-7" />
              <span className="text-lg font-medium">Complain</span>
              <span className="opacity-90 flex items-center gap-1.5 bg-red-400 px-4 py-1.5 rounded-full">
                <Phone className="w-4 h-4" />
                {adminContact.phone}
              </span>
            </div>

            <div className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 duration-300 inline-flex flex-col items-center gap-2 justify-center">
              <MessageSquare className="w-7 h-7" />
              <span className="text-lg font-medium">Write to us</span>
              <span className="opacity-90 flex items-center gap-1.5 bg-green-400 px-4 py-1.5 rounded-full">
                <Mail className="w-4 h-4" />
                {adminContact.email}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-100 rounded text-sm text-gray-600 text-center">
          <p>
            При включении комментария вы автоматически соглашаетесь с протоколом
            сообщество.
          </p>
        </div>
      </div>
    </div>
  );
}
