ALTER TABLE "event" ADD COLUMN "isPhotoHide" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "description" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "event" DROP COLUMN "isSendPhotoToResponse";--> statement-breakpoint
ALTER TABLE "event" DROP COLUMN "isSendPhotoToPost";