-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema homemade_hacks
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `homemade_hacks` ;

-- -----------------------------------------------------
-- Schema homemade_hacks
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `homemade_hacks` DEFAULT CHARACTER SET utf8 ;
USE `homemade_hacks` ;

-- -----------------------------------------------------
-- Table `homemade_hacks`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `homemade_hacks`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NULL,
  `last_name` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  `birthdate` DATE NULL,
  `location` VARCHAR(255) NULL,
  `username` VARCHAR(255) NULL,
  `password` VARCHAR(255) NULL,
  `created_at` DATETIME NULL DEFAULT NOW(),
  `updated_at` DATETIME NULL DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `homemade_hacks`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `homemade_hacks`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `homemade_hacks`.`hacks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `homemade_hacks`.`hacks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL,
  `supplies` TEXT NULL,
  `instructions` TEXT NULL,
  `created_at` DATETIME NULL DEFAULT NOW(),
  `updated_at` DATETIME NULL DEFAULT NOW() ON UPDATE NOW(),
  `category_id` INT NOT NULL,
  PRIMARY KEY (`id`, `category_id`),
  INDEX `fk_hacks_categories1_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_hacks_categories1`
    FOREIGN KEY (`category_id`)
    REFERENCES `homemade_hacks`.`categories` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `homemade_hacks`.`favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `homemade_hacks`.`favorites` (
  `user_id` INT NOT NULL,
  `hack_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `hack_id`),
  INDEX `fk_users_has_hacks_hacks1_idx` (`hack_id` ASC) VISIBLE,
  INDEX `fk_users_has_hacks_users_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_hacks_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `homemade_hacks`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_hacks_hacks1`
    FOREIGN KEY (`hack_id`)
    REFERENCES `homemade_hacks`.`hacks` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
