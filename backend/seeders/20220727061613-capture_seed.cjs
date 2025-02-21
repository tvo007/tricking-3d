"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert("Captures", [
			{
				id: 1,
				user_id: 2,
				captured_id: 1,
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				id: 2,
				user_id: 1,
				captured_id: 2,
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				id: 3,
				user_id: 1,
				captured_id: 3,
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				id: 4,
				user_id: 2,
				captured_id: 3,
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
