variable "gcp_project_id" {
  description = "The GCP project ID to deploy resources into."
  type        = string
}

variable "gcp_region" {
  description = "The GCP region to deploy resources into."
  type        = string
  default     = "us-east1" 
}
variable "instance_name" {
  description = "The name of the Compute Engine instance."
  type        = string
  default     = "my-instance"
}

variable "machine_type" {
  description = "The machine type for the Compute Engine instance."
  type        = string
  default     = "e2-medium"
}

variable "instance_tags" {
  description = "A list of tags for the Compute Engine instance."
  type        = list(string)
  default     = ["http"]
}

variable "boot_disk_image" {
  description = "The boot disk image for the Compute Engine instance."
  type        = string
  default     = "debian-cloud/debian-11"
}
