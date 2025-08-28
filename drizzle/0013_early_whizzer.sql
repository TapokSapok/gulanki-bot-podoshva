CREATE TABLE "event_request" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "event_request_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"profileId" integer NOT NULL,
	"userId" integer NOT NULL,
	"eventId" integer NOT NULL,
	"isApproved" boolean DEFAULT false NOT NULL,
	"isRejected" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "location" varchar(32) NOT NULL;--> statement-breakpoint
ALTER TABLE "event_request" ADD CONSTRAINT "event_request_profileId_profile_id_fk" FOREIGN KEY ("profileId") REFERENCES "public"."profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_request" ADD CONSTRAINT "event_request_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_request" ADD CONSTRAINT "event_request_eventId_event_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."event"("id") ON DELETE no action ON UPDATE no action;