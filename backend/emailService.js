import { Resend } from 'resend';

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function sendWelcomeEmail(
  email,
  name = 'Candidate'
) {
  try {
    console.log(
      '[EMAIL] Sending email to:',
      email
    );

    const response =
      await resend.emails.send({
        from:
            'ForcePilot AI <hello@forcepilotai.online>',

        to: email,

        subject:
          'Welcome to ForcePilot AI 🚀',

        html: `
          <div style="background:#020617;padding:40px;font-family:Arial,sans-serif;color:white;">
            
            <div style="max-width:600px;margin:auto;background:#0f172a;border:1px solid #06b6d4;border-radius:20px;padding:40px;">
              
              <h1 style="color:#06b6d4;font-size:32px;margin-bottom:10px;">
                Welcome to ForcePilot AI
              </h1>

              <p style="font-size:18px;color:#cbd5e1;">
                Hello ${name},
              </p>

              <p style="font-size:16px;color:#94a3b8;line-height:1.7;">
                Your AI-powered Salesforce interview platform is now ready.
              </p>

              <div style="margin:30px 0;padding:20px;background:#020617;border-radius:12px;border:1px solid #0ea5e9;">
                <p style="margin:0;color:#67e8f9;">
                  ✔ AI Voice Interviews
                </p>
                <p style="margin:10px 0 0;color:#67e8f9;">
                  ✔ Recruiter-grade Evaluations
                </p>
                <p style="margin:10px 0 0;color:#67e8f9;">
                  ✔ Salesforce-focused Training
                </p>
              </div>

              <p style="font-size:14px;color:#64748b;margin-top:40px;">
                ForcePilot AI • Interview Intelligence Layer
              </p>

            </div>
          </div>
        `,
      });

    console.log(
      '[EMAIL] Resend response:',
      response
    );

    return {
      success: true,
      response,
    };
  } catch (error) {
    console.error(
      '[EMAIL ERROR]',
      error
    );

    return {
      success: false,
      error,
    };
  }
}