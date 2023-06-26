locals {
  name       = "bytelight-app"
  gcp_region = "europe-west6"
}

provider "google" {
  project = "bytelight-app"
  region  = local.gcp_region
}

data "google_project" "project" {
}

terraform {
  backend "gcs" {
    bucket = "bytelight-app-tf-state"
  }
}