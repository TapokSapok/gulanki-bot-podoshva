CREATE TABLE "city" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "city_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(32) NOT NULL,
	"created_at" timestamp NOT NULL
);
