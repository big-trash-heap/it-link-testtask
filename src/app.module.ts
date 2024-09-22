import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { DatabaseModule } from './database';
import { ColorsRepositoryModule } from './colors-repository';
import { ColorsModule } from './colors/colors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'local.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
    }),
    DatabaseModule,

    /* Repositories (Global) */
    ColorsRepositoryModule.forRoot({}),

    /* Logic (Global) */
    ColorsModule.forRoot(),
  ],
})
export class AppModule {}
