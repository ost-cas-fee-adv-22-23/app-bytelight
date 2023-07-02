variable "nextauthUrl" {
  type        = string
  description = "When deploying to production, set the NEXTAUTH_URL environment variable to the canonical URL of your site."
}

variable "nextauthSecret" {
  type        = string
  description = "Used to encrypt the NextAuth.js JWT."
}

variable "zitadelIssuer" {
  type        = string
  description = "URL of the ZITADEL Identity Provider."
}

variable "zitadelClientId" {
  type        = string
  description = "Id of the Client at ZITADEL."
}

variable "nextPublicQwackerApiUrl" {
  type        = string
  description = "URL of the Qwacker Api."
}
