ALTER TABLE "user" ALTER COLUMN "tg_id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "city" ADD COLUMN "publicChannelId" bigint NOT NULL;--> statement-breakpoint
ALTER TABLE "city" ADD COLUMN "moderateChannelId" bigint NOT NULL;--> statement-breakpoint
ALTER TABLE "city" ADD CONSTRAINT "city_publicChannelId_unique" UNIQUE("publicChannelId");--> statement-breakpoint
ALTER TABLE "city" ADD CONSTRAINT "city_moderateChannelId_unique" UNIQUE("moderateChannelId");