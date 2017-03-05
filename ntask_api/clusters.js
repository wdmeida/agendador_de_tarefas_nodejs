import cluster from "cluster";
import os from "os";

const CPUS = os.cpus();

//Verifica se é o cluster master.
if (cluster.isMaster) {
  //Instancia um processo filho cluster slave para cada núcleo do servidor.
  CPUS.forEach(() => cluster.fork());

  //Acontece quando um cluster está escutando uma porta do servidor.
  cluster.on("listening", worker => {
    console.log("Cluster %d conectado", worker.process.pid);
  });

  //Executa seu callback quando um cluster se desconecta da rede.
  cluster.on("disconnect", worker => {
    console.log("Cluster %d desconectado", worker.process.pid);
  });

  //Ocorre quando um processo filho é fechado no sistema operacional.
  cluster.on("exit", worker => {
    console.log("Cluster %d saiu do ar", worker.process.pid);
    cluster.fork();
  });
} else {
  require("./index.js");
}
