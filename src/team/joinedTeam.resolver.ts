import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JoinedTeam, JoinedTeamDocument } from './schema/joinedTeam.schema';
import { JoinedTeamService } from './services/joinedTeam.service';
import { JoinTeamInput } from './input/joinTeam.input';
import { TeamService } from './services/team.service';
import { AuthId } from '../auth/decorator/authId.decorator';

@Resolver(() => JoinedTeam)
export class JoinedTeamResolver {
  constructor(
    private readonly joinedTeamService: JoinedTeamService,
    private readonly teamService: TeamService,
  ) {}

  @Mutation(() => Boolean)
  async joinTeam(
    @AuthId() authId: string,
    @Args('joinTeamInput') joinTeamInput: JoinTeamInput,
  ) {
    await this.joinedTeamService.joinTeam({ ...joinTeamInput, member: authId });
    return true;
  }

  @Query(() => [JoinedTeam], { nullable: true })
  async getJoinedTeams(@AuthId() authId: string) {
    return await this.joinedTeamService.findJoinedTeams({ member: authId });
  }

  @ResolveField()
  async member(@Parent() team: JoinedTeamDocument) {
    const { member } = await team.populate('member');

    return member;
  }
}
