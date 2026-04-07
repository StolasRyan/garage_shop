export   const isPasswordValid = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d].{6,}$/.test(password);
  };
