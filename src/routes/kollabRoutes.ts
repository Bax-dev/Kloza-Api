import { Router } from 'express';
import { createKollab, getKollabById } from '../controllers/kollabController';
import { createDiscussion } from '../controllers/discussionController';

const router = Router();

/**
 * @swagger
 * /api/kollabs:
 *   post:
 *     summary: Create a new Kollab from an idea
 *     tags: [Kollabs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateKollabDto'
 *           example:
 *             ideaId: "507f1f77bcf86cd799439011"
 *             goal: "Complete the product feature implementation"
 *             participants: ["user123", "user456"]
 *             successCriteria: "Feature is fully implemented and tested"
 *             status: "active"
 *     responses:
 *       201:
 *         description: Kollab created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Kollab'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Idea not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: An active Kollab already exists for this idea
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/kollabs', createKollab);

/**
 * @swagger
 * /api/kollabs/{id}:
 *   get:
 *     summary: Get a Kollab by ID with its associated idea
 *     tags: [Kollabs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: MongoDB ObjectId of the Kollab
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Kollab retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Kollab'
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Kollab not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/kollabs/:id', getKollabById);

/**
 * @swagger
 * /api/kollabs/{id}/discussions:
 *   post:
 *     summary: Add a discussion to a Kollab
 *     tags: [Discussions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: MongoDB ObjectId of the Kollab
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDiscussionDto'
 *           example:
 *             message: "This is a discussion message about the Kollab"
 *             author: "user123"
 *     responses:
 *       201:
 *         description: Discussion created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Discussion'
 *       400:
 *         description: Validation error or invalid Kollab ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Kollab not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/kollabs/:id/discussions', createDiscussion);

export default router;

