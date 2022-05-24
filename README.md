# Music Library

Music Library is a backend API that allows users to perform CRUD operations to manipulate the content of two database tables, 
(Artist and Album) See below for how to do this!

## HTTP Requests

*Postman will need to be installed to perform the following HTTP requests to your localhost*

Create an artist with <strong>POST</strong> `/artist` <br>
Read all artists with <strong>GET</strong> `/artist` <br>
Read a specific artist with <strong>GET</strong> `/artist/:artistId`
Update an artists name or genre with <strong>PATCH</strong> `/artist/:artistId` <br>
Delete an artist with <strong>DELETE</strong> `/artist/:artistId` <br>

Create an album with <strong>POST</strong> `/album` <br>
Read all albums with <strong>GET</strong> `/album` <br>
Read a specific album with <strong>GET</strong> `/album/:albumId`
Update an album name, year, or corresponding artistId with <strong>PATCH</strong> `/album/:albumId` <br>
Delete an album with <strong>DELETE</strong> `/album/:albumId` <br>

## Concepts Covered

- Database design
- MySQL
- TDD (Mocha/Chai/SuperTest)
- CRUD Operations

## Software Used

- Docker
- MySQL Workbench
- Postman

## Acknowledgements

This is a project from the Software Engineering course by Manchester Codes.

## Project Status

Not receiving updates currently :)