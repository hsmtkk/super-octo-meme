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

    const cluster = new ecs.Cluster(this, "cluster", {
      vpc: vpc,
    })

    const service = new ecs_patterns.ApplicationLoadBalancedFargateService(this, "service", {
      assignPublicIp: true,
      cluster: cluster,
      desiredCount: 1,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset("./sample"),
      },
      taskSubnets: cluster.vpc.selectSubnets({
        subnetType: ec2.SubnetType.PUBLIC,
      })
    })
  }
}
