// Importar os novos componentes
import Input from "../../components/Input";
import Botao from "../../components/Botao";
import Card from "../../components/Card"; // Se você criar o Card
import "./style.css"; // Pode manter estilos específicos da página aqui

function Login() {
  return (
    <div className="container">
      {" "}
      {/* Pode ser que precise ajustar este container */}
      {/* Usar o Card para envolver o formulário */}
      <Card>
        {/* Usar <form> se fizer sentido semântico, ou só a div do Card */}
        <form /* onSubmit={suaFuncaoDeSubmit} */>
          <h1>Faça seu cadastro {/* Ou Login, dependendo da tela */}</h1>
          {/* Usar os componentes Input e Botao */}
          <Input placeholder="Nome" name="nome" type="text" />
          <Input placeholder="Email" name="email" type="email" />
          <Input placeholder="Senha" name="pass" type="password" />

          <Botao type="submit">
            {" "}
            {/* Mudar type para submit se for um form */}
            Cadastrar {/* Ou Entrar */}
          </Botao>
        </form>
      </Card>
    </div>
  );
}

export default Login;
