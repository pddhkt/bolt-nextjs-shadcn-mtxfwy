export class PublicError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class AuthenticationError extends PublicError {
  constructor() {
    super("你必須登入才能繼續");
    this.name = "AuthenticationError";
  }
}

export class AuthroizationError extends PublicError {
  constructor() {
    super("你沒有權限進行此操作");
    this.name = "AuthorizationError";
  }
}

export class UsernameInUseError extends PublicError {
  constructor() {
    super("使用者名稱已被使用");
    this.name = "UsernameInUseError";
  }
}

export class UsernameInUseWithDeletedAccountError extends PublicError {
  constructor() {
    super("使用者名稱已被使用，但用戶可能已被刪除");
    this.name = "UsernameInUseError";
  }
}

export class CompanyNameInUseError extends PublicError {
  constructor() {
    super("公司名稱已被使用");
    this.name = "CompanyNameInUseError";
  }
}

export class NotFoundError extends PublicError {
  constructor() {
    super("系統沒有記錄");
    this.name = "NotFoundError";
  }
}

export class TokenExpiredError extends PublicError {
  constructor() {
    super("登入過期");
    this.name = "TokenExpiredError";
  }
}

export class LoginError extends PublicError {
  constructor() {
    super("請檢查你的用戶名稱及密碼是否正確");
    this.name = "LoginError";
  }
}

export class InvalidQueryTypeError extends PublicError {
  constructor() {
    super("Invalid query type");
    this.name = "InvalidQueryTypeError";
  }
}

export class PasswordMismatchError extends PublicError {
  constructor() {
    super("密碼和確認密碼不匹配");
    this.name = "PasswordMismatchError";
  }
}

export class RateLimitError extends Error {
  constructor() {
    super("Rate limit exceeded");
    this.name = "RateLimitError";
  }
}
