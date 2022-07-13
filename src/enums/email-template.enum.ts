export const Email = {
  forgotPassSubject: 'Reset you email with this token',
  forgotPassword: (token: string) => {
    return `
    <div align="center" style="margin: 0 auto; background-color: #f9f9f9; padding: 0 2rem 0 2rem;">
      <div align="center" style="width: 600px; background-color: #ffffff; padding: 2rem;">
        <h1>Dear client</h1>
        <p style="font-size: 1.2rem">Please use the password recovery token in this email.</p>
        <p style="padding-bottom: 0.5rem">The token will automatically expire in 5 minutes. 
        If you don't use it within the time limit, you will have to generate a new one through
        the reset page and use your email address.
        </p>
        <div align="center" style="border: 2px solid black; width: 300px; padding: 0.8rem">
          <span style="font-weight: 700;">${token}</span>
        </div>
      </div
    </div>
  `;
  },
} as const;
