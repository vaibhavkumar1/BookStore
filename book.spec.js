const request = require('supertest');
const server=require('./server');
const chai=require('chai');
const Book=require('../controllers/models/book_model');
const { expect } = require('chai');
const should = chai.should();

describe("API",async ()=>{

  beforeEach((done) => {
    Book.deleteMany({}, (err) => {
       done();
    });
  });

  const book={
    "title":"Test1",
    "author":"testing",
    "year":1998,
    "pages":2000,
    "createdAt":1997
  }

  
  describe("Post",async()=>{
    it("it should create a book",async ()=>{
      await request(server).post('/book').send({
        "title":"Test1",
        "author":"testing",
        "year":2021,
        "pages":1012,
        "createdAt":1997
    })
    .expect(200)
    .then((res) => {
      res.body.book.should.have.property('title');
      res.body.book.should.have.property('author');
      res.body.book.should.have.property('pages');
      res.body.book.should.have.property('year');
    });

    });

  });

  describe("Get",function(){
    it("it should return all the books", function (done){
       request(server)
              .get('/book')
              .expect(200)
              .then((res)=>{
                res.body.should.be.a('array')
              done();
              })
  
    });
  })

  describe("Get/:id",async()=>{
    it("it should return one book",async()=>{
      const book = new Book({ 
        title: "The Lord of the Rings", author: "Vaibhav gupta", year: 2018, pages: 1202
      });
          book.save((err, book) => {
            request(server)
            .get('/book/' + book.id)
            .send(book)
            .then((res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('title');
                  res.body.should.have.property('author');
                  res.body.should.have.property('pages');
                  res.body.should.have.property('year');
                  res.body.should.have.property('_id').eql(book.id);
            });
          });
    })
  })

  describe("Put/:id",async()=>{
    it("it should update a book",async()=>{
      const book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
          book.save((err, book) => {
                request(server)
                .put('/book/' + book.id)
                .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778})
                .expect(200)
                .then((res) => {
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('Book updated!');
                      res.body.book.should.have.property('year').eql(1950);
                });
          });
    })
  })

  describe('Delete/:id', () => {
    it('it should DELETE a book', () => {
        const book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
        book.save((err, book) => {
              request(server)
              .delete('/book/' + book.id)
              .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book successfully deleted!');
                    res.body.result.should.have.property('ok').eql(1);
                    res.body.result.should.have.property('n').eql(1);
              });
        });
    });

  })



})