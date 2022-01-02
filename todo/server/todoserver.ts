import express    = require ('express');
import bodyParser = require ('body-parser');
import {Request, Response} from 'express';

export class ToDoEntry {
  title: string;
  done: boolean;
  date: Date;


  constructor(title: string) {
    this.title = title;
    this.date = new Date();
    this.done = false;

  }
}

let todoList: ToDoEntry[];

todoList = [
  new ToDoEntry('Milch'),
  new ToDoEntry('Butter'),
  new ToDoEntry('Brot')
];

let router = express();

router.use(bodyParser.json());

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.post('/entry', function (req: Request, res: Response) {
  let title: string = (req.body.title ? req.body.title : '');
  let message = '';
  if (title.trim().length !== 0) {
    todoList.push(new ToDoEntry(title));
    message = `${title} erfolgreich hinzugefügt`;
    res.status(201);
  } else {
    res.status(400);
    message = 'Keinen title angegeben';
  }
  res.send({'message': message});
});


router.delete('/entry/:id', function (req: Request, res: Response) {
  let id: number = req.params.id;
  let message: string = '';
  if (!isNaN(id) && id >= 0 && id < todoList.length && todoList[id] != null) {
    message = `${todoList[id].title} wurde gelöscht.`;
    todoList.splice(id, 1);
    res.status(200);
  } else if (isNaN(id)) {
    message = 'ID \'' + id + '\' ist keine Zahl';
    res.status(400);
  } else if (id < 0 || id >= todoList.length) {
    message = 'ID ' + id + ' ist außerhalb des gültigen Bereichs';
    res.status(404);
  } else {
    message = 'Entry mit ID ' + id + ' wurde gelöscht';
    res.status(410);
  }
  res.json({'message': message});
});

router.put('/done/:id', function(req: Request, res: Response) {
  let id: number = req.params.id;
  let message: string = '';
  if (!isNaN(id) && id >= 0 && id < todoList.length && todoList[id] != null) {
    message = `${todoList[id].title} wurde als erledigt markiert.`;
    todoList[id].done = true;
    res.status(200);
  } else if (isNaN(id)) {
    message = 'ID \'' + id + '\' ist keine Zahl';
    res.status(400);
  } else if (id < 0 || id >= todoList.length) {
    message = 'ID ' + id + ' ist außerhalb des gültigen Bereichs';
    res.status(404);
  } else {
    message = 'Entry mit ID ' + id + ' wurde zuvor gelöscht';
    res.status(410);
  }
  res.json({'message': message});
});

router.put('/undone/:id', function(req: Request, res: Response) {
  let id: number = req.params.id;
  let message: string = '';
  if (!isNaN(id) && id >= 0 && id < todoList.length && todoList[id] != null) {
    message = `${todoList[id].title} wurde als nicht erledigt markiert.`;
    todoList[id].done = false;
    res.status(200);
  } else if (isNaN(id)) {
    message = 'ID \'' + id + '\' ist keine Zahl';
    res.status(400);
  } else if (id < 0 || id >= todoList.length) {
    message = 'ID ' + id + ' ist außerhalb des gültigen Bereichs';
    res.status(404);
  } else {
    message = 'Entry mit ID ' + id + ' wurde zuvor gelöscht';
    res.status(410);
  }
  res.json({'message': message});
});

router.get('/todolist', function (req: Request, res: Response) {
  let message: string;
  message = todoList.length + ' ToDos wurden gefunden';
  res.status(200);
  res.json({
    'message': message,
    'todoList': todoList
  });
});


router.use('/', express.static(`${__dirname}/../todo/dist/todo`));
router.use('/*', express.static(`${__dirname}/../todo/dist/todo`));

router.listen(8080, 'localhost', function () {
  console.log('');
  console.log('-------------------------------------------------------------');
  console.log('                    ToDo-Backend läuft                       ');
  console.log('-------------------------------------------------------------');
  console.log('       Liste abrufen:     http://localhost:8080/todolist     ');
  console.log('       Frontend aufrufen: http://localhost:8080              ');
  console.log('-------------------------------------------------------------');
});
