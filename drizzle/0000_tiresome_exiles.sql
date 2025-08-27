CREATE TABLE "profile" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "profile_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"name" varchar(16) NOT NULL,
	"age" integer NOT NULL,
	"photo" text[] DEFAULT array[]::text[] NOT NULL,
	"city" varchar(32) NOT NULL,
	"about_me" varchar(256),
	"created_at" timestamp NOT NULL,
	CONSTRAINT "profile_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"tg_id" integer NOT NULL,
	"username" varchar(32),
	"first_name" varchar(64),
	"karma" integer DEFAULT 0 NOT NULL,
	"role" varchar(32) DEFAULT 'default' NOT NULL,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "user_tg_id_unique" UNIQUE("tg_id"),
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;