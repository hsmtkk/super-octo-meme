module "ecs" {
  source = "terraform-aws-modules/ecs/aws"

  cluster_name = "${var.project}-cluster"
  fargate_capacity_providers = {
    FARGATE_SPOT = {
      default_capacity_provider_strategy = {
        weight = 100
      }
    }
  }
  services = {
    sample = {
      container_definitions = {
        sample = {
          image = "public.ecr.aws/ecs-sample-image/amazon-ecs-sample:latest"
        }
      }
      subnet_ids = module.vpc.private_subnets
    }
  }
}
