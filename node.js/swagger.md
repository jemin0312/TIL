### 기본 문서 작성 양식

```shell
/** 
* @swagger
*     components:
*         schemas:
*             Book:
*                 type: object
*                 required:
*                     - name
*                     - age
*                     - comment
*                 properties:
*                     id:
*                         type: integer
*                         description: The auto-generated id of the book.
*                     name:
*                         type: string
*                         description: The title of your book.
*                     age:
*                         type: integer
*                         description: Who wrote the book?
*                     comment:
*                         type: text
*                         description: Have you finished reading it?
*                     createdAt:
*                         type: string
*                         format: date
*                         description: The date of the record creation.
*                     example:
*                         title: The Pragmatic Programmer
*                         author: Andy Hunt / Dave Thomas
*                         finished: true
*/

/**
*  @swagger
*  tags:
*    name: User
*    description: testing swagger .
*/
/**
*  @swagger
*  paths:
*   /hello:
*     get:
*       summary: testing swagger
*       tags: [Books]
*       responses:
*         "200":
*           description: Testing....
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Book'
*     post:
*       summary: Creates a new book
*       tags: [Books]
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Book'
*       responses:
*         "200":
*           description: The created book.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Book'
*/



```
