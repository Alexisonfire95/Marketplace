import { Migration } from '@mikro-orm/migrations';

export class Migration20251217143820 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user_profiles" ("first_name" varchar(255) not null, "last_name" varchar(255) not null, "phone" varchar(255) null, "address" text null, "avatar_url" varchar(255) null, constraint "user_profiles_pkey" primary key ("user_id"));`);

    this.addSql(`create table "users" ("id" serial primary key, "email" varchar(255) not null, "password_hash" varchar(255) not null, "role" text check ("role" in ('BUYER', 'SELLER', 'ADMIN')) not null default 'BUYER', "created_at" timestamptz not null, "deleted_at" timestamptz null, "profile_user_id" int not null);`);
    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);
    this.addSql(`alter table "users" add constraint "users_profile_user_id_unique" unique ("profile_user_id");`);

    this.addSql(`alter table "users" add constraint "users_profile_user_id_foreign" foreign key ("profile_user_id") references "user_profiles" ("user_id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "users" drop constraint "users_profile_user_id_foreign";`);

    this.addSql(`drop table if exists "user_profiles" cascade;`);

    this.addSql(`drop table if exists "users" cascade;`);
  }

}
