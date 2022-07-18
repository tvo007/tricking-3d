"use strict";

import { DataTypes } from "sequelize";

export const Trick = (sequelize) => {
	return sequelize.define(
		"Tricks",
		{
			trick_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: DataTypes.STRING,
			user_renamed: DataTypes.STRING,
			stance_id: {
				type: DataTypes.STRING,
				references: { model: "Stances", key: "stance_id" },
			},
			takeoffStance_id: {
				type: DataTypes.STRING,
				references: { model: "Stances", key: "stance_id" },
			},
			landingStance_id: {
				type: DataTypes.STRING,
				references: { model: "Stances", key: "stance_id" },
			},
			variations_id: DataTypes.INTEGER,
			base_id: DataTypes.STRING,
		},
		{ constraints: false }
	);
};