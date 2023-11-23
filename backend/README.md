# Setup

npm install express mongoose body-parser dotenv axios nodemon cors

# Run
`cd .../backend`  
`npm run start:dev`
or
`npm run start`

# Data Structure

**Note：**

- **SpecialString** noteId (From MongoDB)
- **String** userId, title, content
- **Boolean** isLinked
- **Date** createdAt  

**Article：**

- **SpecialString** articleId (From MongoDB)
- **String** userId, title, content, category
- **Date** createdAt
- **String[]** linkedNotes

# API Format

`$` = "http://localhost:3000", or other URL backend code runs on

## Note Related：

- POST Note   
{noteId, userId, title, createdAt} = ([$/user/:userId/note](url), body = {title,  content})
- GET Note  
{note} = ([$/note/:noteId](url))
- GET Notes  
{note1, note2...} = ([$/user/:userId/notes](url))
- GET Notes by isLinked (overload)
{note1, note2...} = ([$/user/:userId/notes/?isLinked = true/false](url))
- DELETE Note  
{msg} = ([$/note/:noteId](url))
  > add 403 protection if note is Linked
- PUT Note Title  
{userId, title} = ([$/note/:noteId/?title= new title](url))
- PUT Note isLinked  
{userId, isLinked} = ([$/note/:noteId/?category = new category](url))
  > This is modified from PUT Note category,
  > however, POST Article is also modified, so this method is not needed to be called for now
- PUT Note Content  
{userId, content} = ([$/note/:noteId/content](url), body = {new content})

## Article Related：

- POST Article  
{articleId, userId, title, createdAt} = ([$/user/:userId/article](url), body = {category, content, linkedNotes})
- GET Article  
{article} = ([$/article/:articleId](url))
- GET Article's linkedNotes
{note1, note2...} = ([$/article/:articleId/linkedNotes](url))
- GET Articles  
{article1, article2...} = ([$/user/:userId/articles](url))
- DELETE Article  
{msg} = ([$/article/:articleId](url))
- PUT Article Title  
{userId, title} = ([$/article/:title/?title= new title](url))
- PUT Article Category  
{userId, category} = ([$/article/:articleId/?category = new category](url))
- PUT Article Content  
{userId, content} = ([$/article/:articleId/content](url), body = {new content})
- PUT Article LinkedNotes  
{userId, linkedNotes} = ([$/article/:articleId/linkedNotes](url), body = {linkedNotes})

## Danger Zone：
- DELETE All Notes and Articles
{msg} = ([$/user/:userId/danger/clear-all](url))

## AI Related：
- POST Questions when Creating Article  
{questions} = ([$/questions/](url), body = {[note1, note2...]})