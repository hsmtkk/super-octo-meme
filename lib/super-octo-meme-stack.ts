import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as ecs from "aws-cdk-lib/aws-ecs"

export class SuperOctoMemeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "vpc", {
      availabilityZones: ["ap-northeast-1a", "ap-northeast-1c", "ap-northeast-1d"],
      natGateways: 0,
    })

    const service = new ecs_patterns.ApplicationLoadBalancedFargateService(this, "service", {
      capacityProviderStrategies: [{
        capacityProvider: "FARGATE_SPOT",
        weight: 1,
        base: 1,
      }],
      platformVersion: ecs.FargatePlatformVersion.VERSION1_3,
      taskImageOptions: {
        // image: ecs.ContainerImage.("public.ecr.aws/ecs-sample-image/amazon-ecs-sample:latest"),
        image: ecs.ContainerImage.fromAsset("./sample"),
        enableLogging: true,
      },
      taskSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      vpc: vpc,
    })
  }
}
