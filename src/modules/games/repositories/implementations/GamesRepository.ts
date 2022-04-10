import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(title: string): Promise<Game[]> {
    const games = await this.repository
      .createQueryBuilder("games")
      .where("LOWER(games.title) LIKE LOWER(:title)", { title: `%${title}%` })
      .getMany();

    return games;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const totalGames = await this.repository.query(
      "SELECT COUNT(1) FROM games"
    );

    return totalGames;
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const users = await getRepository(User)
      .createQueryBuilder("users")
      .innerJoinAndSelect("users.games", "games", "games.id = :id", { id })
      .getMany();

    console.log(users);

    return users;
  }
}
