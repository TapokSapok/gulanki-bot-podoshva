CREATE TABLE "event" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "event_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"profileId" integer NOT NULL,
	"userId" integer NOT NULL,
	"publicChannelId" bigint NOT NULL,
	"moderateChannelId" bigint NOT NULL,
	"isApproved" boolean DEFAULT false NOT NULL,
	"isRejected" boolean DEFAULT false NOT NULL,
	"isUsernameHide" boolean NOT NULL,
	"isSendPhotoToResponse" boolean NOT NULL,
	"isSendPhotoToPost" boolean NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "city" DROP CONSTRAINT "city_publicChannelId_unique";--> statement-breakpoint
ALTER TABLE "city" DROP CONSTRAINT "city_moderateChannelId_unique";--> statement-breakpoint
ALTER TABLE "event" ADD CONSTRAINT "event_profileId_profile_id_fk" FOREIGN KEY ("profileId") REFERENCES "public"."profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event" ADD CONSTRAINT "event_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;