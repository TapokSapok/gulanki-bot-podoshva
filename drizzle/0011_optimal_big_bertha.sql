ALTER TABLE "event" ADD COLUMN "zone" varchar(16) NOT NULL;--> statement-breakpoint
ALTER TABLE "event" DROP COLUMN "isUsernameHide";