module "vpc" {
  source          = "terraform-aws-modules/vpc/aws"
  azs             = ["ap-northeast-1a", "ap-northeast-1c", "ap-northeast-1d"]
  cidr            = "10.0.0.0/16"
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  private_subnets = ["10.0.10.0/24", "10.0.12.0/24", "10.0.13.0/24"]
}