import React from 'react'
import MainScreen from './../components/MainScreen';
import { Link } from 'react-router-dom';
import { Button ,Card,Badge,Accordion} from 'react-bootstrap';
import notes from "../data/noes"
const MyNotes = () => {
  const deleteHandler= ()=>{
    if(window.confirm("Are you sure?")){

    }
  }
  return (
    <div>
        <MainScreen title=" Welcom Back Kevin..">
          <Link to='createnote'>
            <Button style={{marginLeft:10,marginBottom:6}} size="lg">
              Create New Note
            </Button>
            
          </Link>
          {
            notes.map((note)=>(
              <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0"> 
              <Card style={{margin:10}}>
              <Card.Header style={{display:"flex"}} >
              <span
              style={{
                color:"black",
                textDecoration: "none",
                flex:1,
                cursor:"pointer",
                alignSelf:"center",
                fontSize:12
              }}
              >
              <Accordion.Header style={{outline:"none"}}>{note.title}</Accordion.Header>
              </span>
              <div>
                  <Button href={`/note/${note._id}`} >Edit</Button>
                  <Button variant="danger" className="mx-2" onClick={()=>deleteHandler(note._id)} >Delete</Button>
                </div>
              </Card.Header>
              <Accordion.Body>
              <Card.Body>
              <h4>
                <Badge bg="success">
                  Category - {note.category}
                </Badge>
              </h4>
            <blockquote className="blockquote mb-0">
            <p>
              {note.content}
            </p>
            <footer className="blockquote-footer">
             Created on - date
            </footer>
          </blockquote>
            </Card.Body>
              </Accordion.Body>
              
              
            </Card>
            </Accordion.Item>
          </Accordion>
              
            ))
          }

        </MainScreen>

    </div>
  )
}

export default MyNotes