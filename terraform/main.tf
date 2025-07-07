resource "google_compute_instance" "terraform_instance" {
  name         = var.instance_name
  machine_type = var.machine_type
  zone         = "${var.gcp_region}-d" 
  tags = var.instance_tags

  boot_disk {
    initialize_params {
      image = var.boot_disk_image
    }
  }

  network_interface {
    network = "default" 
    access_config {
   
    }
  }

  allow_stopping_for_update = true
}

