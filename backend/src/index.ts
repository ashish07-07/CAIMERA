// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import { Generatequiz } from "./allfunctions/Generatequixfunction";
// import prisma from "./db";

// import userlogin from "./routes/Userregister";
// import userleaderboard from "./routes/leaderboard";
// let questionCount = 0;
// let currentquestioncount = 0;
// let answerReceived = false;
// let correctanswer: number;
// let gameOver = false;

// const app = express();

// app.use(express.json());

// app.use("/ranking", userleaderboard);

// const server = http.createServer(app);

// let usercount = new Map();

// let roundTimer: NodeJS.Timeout | null = null;

// app.use("/user", userlogin);

// function Startnewround() {
//   answerReceived = false;
//   gameOver = false;

//   if (usercount.size >= 2) {
//     if (currentquestioncount < 5) {
//       io.emit("gamestartaware", {
//         message: "Gameover notification",
//       });
//       setTimeout(() => {
//         currentquestioncount++;
//         const questionformat = Generatequiz();
//         let questionformatre = `${questionformat.num1} ${questionformat.operator}${questionformat.num2}`;
//         correctanswer = eval(questionformatre);
//         console.log(`The answer is ${correctanswer}`);

//         console.log("New question generated:", questionformat);

//         io.emit("newquestion", questionformat);

//         if (roundTimer) clearTimeout(roundTimer);

//         roundTimer = setTimeout(() => {
//           console.log("The timer is up.");
//           io.emit("timeup", "No correct answers! Moving to NEXT ROUND.");

//           if (currentquestioncount < 2) {
//             Startnewround();
//           } else {
//             console.log("Ending the game. Game over!");

//             // io.emit("gameOver", "Game over! No more questions.");
//             io.emit("gameOver", {
//               message: "Game Over",
//             });
//             gameOver = true;

//             if (roundTimer) clearTimeout(roundTimer);
//           }
//         }, 20000);
//       }, 2000);
//     } else {
//       // io.emit("gameOver", "Game over! No more questions.");
//       console.log("choota bheem dekno jau");
//       io.emit("gameOver", {
//         message: "Game Over",
//       });
//       gameOver = true;
//     }
//   } else {
//     io.emit("waitre", "Wait for a minimum of two users to start the round.");
//   }
// }

// // const io = new Server(server, {
// //   cors: {
// //     origin: [
// //       "http://localhost:5173",
// //       "http://localhost:3001",
// //       "https://caimera-gamma.vercel.app",
// //       "https://caimera-git-main-ashish07-07s-projects.vercel.app",
// //       "https://caimera-ae52qtlfs-ashish07-07s-projects.vercel.app",
// //       "https://caimera-02.vercel.app/",
// //       "https://caimera-02-git-main-ashish07-07s-projects.vercel.app/",
// //       "https://caimera-02-de8bk4y5f-ashish07-07s-projects.vercel.app/",
// //     ],
// //     methods: ["GET", "POST"],
// //     credentials: true,
// //   },
// // });
// const io = new Server(server, {
//   cors: {
//     origin: (origin, callback) => {
//       callback(null, true); // Accept all origins
//     },
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });


// io.on("connection", (socket) => {
//   console.log("New user connected:", socket.id);

//   usercount.set(socket.id, true);

//   try {
//     if (usercount.size >= 2) {
//       if (roundTimer) clearTimeout(roundTimer);
//       Startnewround();
//     } else {
//       io.emit(
//         "waitre",
//         "Wait till more participants join to start the competitive quiz."
//       );
//     }
//     interface Answerdata {
//       answer: number;
//       userId: string;
//       name: string;
//     }

//     socket.on("answers", async function ({ answer, userId, name }: Answerdata) {
//       if (gameOver) {
//         console.log("Game is over, no more answers are accepted.");
//         return;
//       }
//       console.log("the user have given the answer");
//       console.log(
//         `the answer I received is ${answer} and the correct answer is ${correctanswer}`
//       );

//       const parsedUserId = parseInt(userId, 10);

//       try {
//         if (!answerReceived && answer === correctanswer) {
//           answerReceived = true;
//           io.emit(
//             "answerrecieved",

//             // `Well done, guys! We got the first person who gave the correct answer is ${name}`
//             {
//               correctusername: name,
//             }
//           );

//           socket.emit(
//             "you gave the correct answer",
//             "congrajulation u gave the correct answer"
//           );

//           // const existingScore = await prisma.score.findUnique({
//           //   where: { userId: parsedUserId },
//           // });

//           const existingScore = await prisma.score.findFirst({
//   where: { 
//     userId: parsedUserId 
//   },
// });

//           if (existingScore) {
//             await prisma.score.update({
//               where: { id: existingScore.id },
//               data: { score: { increment: 1 } },
//             });
//           } else {
//             await prisma.score.create({
//               data: {
//                 userId: parsedUserId,
//                 score: 1,
//               },
//             });
//           }

//           if (roundTimer) clearTimeout(roundTimer);

//           Startnewround();
//         } else {
//           console.log("The answer is wrong.");
//         }
//       } catch (e) {
//         console.log(e);
//       }
//     });
//   } catch (e) {
//     console.log(e);
//   }

//   socket.on("newquizround", function () {
//     (currentquestioncount = 0), (answerReceived = false);
//     gameOver = false;

//     io.emit("someonestartedanewquiz", {
//       message: "some one wants to play a new round along with u all",
//     });

//     if (roundTimer) clearTimeout(roundTimer);

//     Startnewround();
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//     usercount.delete(socket.id);

//     if (usercount.size < 2) {
//       if (roundTimer) {
//         clearTimeout(roundTimer);
//         roundTimer = null;
//       }
//       io.emit("stopQuiz", "Not enough users. Waiting for more participants...");
//     }
//   });
// });
// const PORT = 3000;
// server.listen(3000, () => {
//   console.log("WebSocket server listening on port 3000");
// });


import express from "express";
import http from "http";
import { Server } from "socket.io";
import { Generatequiz } from "./allfunctions/Generatequixfunction";
import prisma from "./db";

import userlogin from "./routes/Userregister";
import userleaderboard from "./routes/leaderboard";

const app = express();
app.use(express.json());

app.use("/user", userlogin);
app.use("/ranking", userleaderboard);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => callback(null, true),
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let usercount = new Map();
let roundTimer: NodeJS.Timeout | null = null;

let correctanswer: number;
let answerReceived = false;
let currentquestioncount = 0;
let gameOver = false;
let gameStarted = false;

function Startnewround() {
  if (usercount.size < 2) {
    io.emit("waitre", "Wait for a minimum of two users to start the round.");
    return;
  }

  answerReceived = false;
  gameOver = false;

  if (currentquestioncount < 5) {
    const questionformat = Generatequiz();
    const questionformatre = `${questionformat.num1} ${questionformat.operator} ${questionformat.num2}`;
    correctanswer = eval(questionformatre);

    console.log(`New question: ${questionformatre} | Correct answer: ${correctanswer}`);
    io.emit("newquestion", questionformat);

    currentquestioncount++;

    if (roundTimer) clearTimeout(roundTimer);
    roundTimer = setTimeout(() => {
      if (!answerReceived) {
        console.log("Timer up: no correct answer.");
        io.emit("timeup", "No correct answers! Moving to NEXT ROUND.");
        Startnewround();
      }
    }, 20000);
  } else {
    console.log("Game over: All rounds completed.");
    io.emit("gameOver", { message: "Game Over" });
    gameOver = true;
    gameStarted = false;
    currentquestioncount = 0;
    if (roundTimer) clearTimeout(roundTimer);
  }
}

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);
  usercount.set(socket.id, true);

  if (usercount.size >= 2 && !gameStarted) {
    gameStarted = true;
    currentquestioncount = 0;
    Startnewround();
  } else {
    io.emit("waitre", "Wait till more participants join to start the competitive quiz.");
  }

  socket.on("answers", async ({ answer, userId, name }) => {
    if (gameOver) {
      console.log("Game is over, no more answers are accepted.");
      return;
    }

    const parsedUserId = parseInt(userId, 10);
    console.log(`Answer received from ${name}: ${answer} | Correct: ${correctanswer}`);

    if (!answerReceived && answer === correctanswer) {
      answerReceived = true;

      io.emit("answerrecieved", { correctusername: name });
      socket.emit("you gave the correct answer", "Congratulations, you gave the correct answer!");

      try {
        const existingScore = await prisma.score.findFirst({ where: { userId: parsedUserId } });

        if (existingScore) {
          await prisma.score.update({
            where: { id: existingScore.id },
            data: { score: { increment: 1 } },
          });
        } else {
          await prisma.score.create({
            data: { userId: parsedUserId, score: 1 },
          });
        }

        if (roundTimer) clearTimeout(roundTimer);
        Startnewround();
      } catch (error) {
        console.error("Error updating score:", error);
      }
    } else {
      console.log("Incorrect answer or already answered.");
    }
  });

  socket.on("newquizround", () => {
    console.log("New quiz round requested.");
    currentquestioncount = 0;
    answerReceived = false;
    gameOver = false;
    gameStarted = true;

    io.emit("someonestartedanewquiz", {
      message: "Someone started a new quiz round!",
    });

    if (roundTimer) clearTimeout(roundTimer);
    Startnewround();
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    usercount.delete(socket.id);

    if (usercount.size < 2) {
      console.log("Less than 2 users, pausing the game.");
      gameStarted = false;
      if (roundTimer) {
        clearTimeout(roundTimer);
        roundTimer = null;
      }
      io.emit("stopQuiz", "Not enough users. Waiting for more participants...");
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`WebSocket server listening on port ${PORT}`);
});
