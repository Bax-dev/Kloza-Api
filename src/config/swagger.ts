import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Kloza Ideas API',
    version: '1.0.1',
    description: 'API documentation for Kloza Ideas management system',
    contact: {
      name: 'API Support',
    },
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}`,
      description: 'Development server',
    },
  ],
  components: {
    schemas: {
      Idea: {
        type: 'object',
        required: ['title', 'description', 'createdBy', 'status', 'createdAt'],
        properties: {
          _id: {
            type: 'string',
            description: 'Unique identifier for the idea',
            example: '507f1f77bcf86cd799439011',
          },
          title: {
            type: 'string',
            description: 'Title of the idea',
            minLength: 1,
            maxLength: 200,
            example: 'New Product Feature',
          },
          description: {
            type: 'string',
            description: 'Detailed description of the idea',
            minLength: 1,
            maxLength: 5000,
            example: 'This is a detailed description of the idea',
          },
          createdBy: {
            type: 'string',
            description: 'User ID or name who created the idea',
            minLength: 1,
            example: 'user123',
          },
          status: {
            type: 'string',
            enum: ['draft', 'approved', 'archived'],
            description: 'Status of the idea',
            default: 'draft',
            example: 'draft',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time when the idea was created',
            example: '2024-01-15T10:30:00.000Z',
          },
        },
      },
      CreateIdeaDto: {
        type: 'object',
        required: ['title', 'description', 'createdBy'],
        properties: {
          title: {
            type: 'string',
            description: 'Title of the idea',
            minLength: 1,
            maxLength: 200,
            example: 'New Product Feature',
          },
          description: {
            type: 'string',
            description: 'Detailed description of the idea',
            minLength: 1,
            maxLength: 5000,
            example: 'This is a detailed description of the idea',
          },
          createdBy: {
            type: 'string',
            description: 'User ID or name who created the idea',
            minLength: 1,
            example: 'user123',
          },
          status: {
            type: 'string',
            enum: ['draft', 'approved', 'archived'],
            description: 'Status of the idea (optional, defaults to draft)',
            example: 'draft',
          },
        },
      },
      ApiResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          message: {
            type: 'string',
            example: 'Operation successful',
          },
          data: {
            type: 'object',
          },
          count: {
            type: 'number',
            description: 'Number of items (for list responses)',
            example: 10,
          },
          error: {
            type: 'string',
            description: 'Error message (only in development mode)',
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          message: {
            type: 'string',
            example: 'Error message',
          },
          error: {
            type: 'string',
            description: 'Detailed error message (only in development mode)',
          },
        },
      },
      Kollab: {
        type: 'object',
        required: ['ideaId', 'goal', 'participants', 'successCriteria', 'status', 'createdAt'],
        properties: {
          _id: {
            type: 'string',
            description: 'Unique identifier for the Kollab',
            example: '507f1f77bcf86cd799439011',
          },
          ideaId: {
            oneOf: [
              {
                type: 'string',
                description: 'Reference to the Idea',
                example: '507f1f77bcf86cd799439011',
              },
              {
                $ref: '#/components/schemas/Idea',
              },
            ],
          },
          goal: {
            type: 'string',
            description: 'Goal of the Kollab',
            minLength: 1,
            maxLength: 1000,
            example: 'Complete the product feature implementation',
          },
          participants: {
            type: 'array',
            description: 'Array of user IDs or names participating in the Kollab',
            items: {
              type: 'string',
            },
            minItems: 1,
            example: ['user123', 'user456'],
          },
          successCriteria: {
            type: 'string',
            description: 'Success criteria for the Kollab',
            minLength: 1,
            maxLength: 2000,
            example: 'Feature is fully implemented and tested',
          },
          status: {
            type: 'string',
            enum: ['active', 'completed', 'cancelled'],
            description: 'Status of the Kollab',
            default: 'active',
            example: 'active',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time when the Kollab was created',
            example: '2024-01-15T10:30:00.000Z',
          },
        },
      },
      CreateKollabDto: {
        type: 'object',
        required: ['ideaId', 'goal', 'participants', 'successCriteria'],
        properties: {
          ideaId: {
            type: 'string',
            description: 'MongoDB ObjectId of the idea to create Kollab from',
            pattern: '^[0-9a-fA-F]{24}$',
            example: '507f1f77bcf86cd799439011',
          },
          goal: {
            type: 'string',
            description: 'Goal of the Kollab',
            minLength: 1,
            maxLength: 1000,
            example: 'Complete the product feature implementation',
          },
          participants: {
            type: 'array',
            description: 'Array of user IDs or names participating in the Kollab',
            items: {
              type: 'string',
            },
            minItems: 1,
            example: ['user123', 'user456'],
          },
          successCriteria: {
            type: 'string',
            description: 'Success criteria for the Kollab',
            minLength: 1,
            maxLength: 2000,
            example: 'Feature is fully implemented and tested',
          },
          status: {
            type: 'string',
            enum: ['active', 'completed', 'cancelled'],
            description: 'Status of the Kollab (optional, defaults to active)',
            example: 'active',
          },
        },
      },
      Discussion: {
        type: 'object',
        required: ['kollabId', 'message', 'author', 'createdAt'],
        properties: {
          _id: {
            type: 'string',
            description: 'Unique identifier for the discussion',
            example: '507f1f77bcf86cd799439011',
          },
          kollabId: {
            oneOf: [
              {
                type: 'string',
                description: 'Reference to the Kollab',
                example: '507f1f77bcf86cd799439011',
              },
              {
                $ref: '#/components/schemas/Kollab',
              },
            ],
          },
          message: {
            type: 'string',
            description: 'Discussion message',
            minLength: 1,
            maxLength: 5000,
            example: 'This is a discussion message about the Kollab',
          },
          author: {
            type: 'string',
            description: 'User ID or name of the discussion author',
            minLength: 1,
            example: 'user123',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Date and time when the discussion was created',
            example: '2024-01-15T10:30:00.000Z',
          },
        },
      },
      CreateDiscussionDto: {
        type: 'object',
        required: ['message', 'author'],
        properties: {
          message: {
            type: 'string',
            description: 'Discussion message',
            minLength: 1,
            maxLength: 5000,
            example: 'This is a discussion message about the Kollab',
          },
          author: {
            type: 'string',
            description: 'User ID or name of the discussion author',
            minLength: 1,
            example: 'user123',
          },
        },
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);

