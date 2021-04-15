# Available routes

### `POST` `/api/auth/register`

Request body JSON **required fields**:<br>

```
{
	"username": String,
	"password": String
}
```

<br>
API returns token which expires in 6h and new created user id.

### `POST` `/api/auth/login`

Request body JSON **required fields**:<br>

```
{
	"username": String,
	"password": String
}
```

<br>
API returns token which expires in 6h and new created user id.
<br>
<br>
<br>

## Custom page routes

### `POST` `/api/custom-page/`

API create a new page.

Request body JSON **required field**: <br>

```
{
    image: String,
    date: String,
    type: String,
    title: String,
    description: String,
    content: String,
}
```

### `POST` `/api/custom-page/:pageID`

API update existing page by id.

Request body JSON **required field**: <br>

```
{
    _id: String,
    image: String,
    date: String,
    type: String,
    title: String,
    description: String,
    content: String,
}
```

### `GET` `/api/custom-page?type={type}&page={page}&query={query}`

API search all existing pages by query.<br>

API returns finded items, limit per page, number of page, previous page (if exist), next page (if exist).<br>

Default quantity of items per page is **10**.

### `DELETE` `/api/custom-page/:pageID`

API delete the page by id.<br>

API returns message _Page successfully deleted!_.
<br>
<br>
<br>

## Uploads routes

### `POST` `/api/uploads/img`

Form data - file<br>
API returns message _image successfully uploaded!_.

### `GET` `/api/uploads/img`

API returns all uploaded images.

### `GET` `/api/uploads/:id`

API returns uploaded file by id.

### `DELETE` `/api/uploads/:id`

API returns message _File successfully deleted!_.
