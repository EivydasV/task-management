import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TeamService } from './services/team.service';
import { CreateTeamInput } from './input/createTeam.input';
import { AuthId } from '../auth/decorator/authId.decorator';
import { Team, TeamDocument } from './schema/team.schema';
import { GetTeamInput } from './input/getTeam.input';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Mutation(() => Boolean)
  async createTeam(
    @AuthId() authId: string,
    @Args('createTeamInput') createTeamInput: CreateTeamInput,
  ) {
    await this.teamService.create({ ...createTeamInput, createdBy: authId });

    return true;
  }

  @Query(() => [Team])
  async getMyCreatedTeams(@AuthId() authId: string) {
    return await this.teamService.findTeams({ createdBy: authId });
  }

  @Query(() => Team, { nullable: true })
  async getTeam(@Args('getTeam') getTeam: GetTeamInput) {
    return await this.teamService.findTeam({ _id: getTeam.team });
  }

  @ResolveField()
  async createdBy(@Parent() team: TeamDocument) {
    const { createdBy } = await team.populate('createdBy');

    return createdBy;
  }
}
