import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify"; 
import "./style.css";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Logo from "../../components/Logo";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const cleanedEmail = email.trim();
    const cleanedSenha = senha.trim();

    if (!cleanedEmail || !cleanedSenha) {
      toast.warning("Preencha todos os campos!");
      return;
    }

    try {
      const url = `http://localhost:3000/users?email=${encodeURIComponent(
        cleanedEmail
      )}&pass=${encodeURIComponent(cleanedSenha)}`;
      const response = await fetch(url);
      const users = await response.json();

      if (users.length > 0) {
        const usuarioLogado = users[0];
        localStorage.setItem("user_id", usuarioLogado.id);
        localStorage.setItem("usuario", JSON.stringify(usuarioLogado));

        toast.success(
          `Bem-vindo de volta, ${usuarioLogado.nome || "Usuário"}!`
        ); // Success (Verde)
        navigate("/perfil");
      } else {
        toast.error("E-mail ou senha incorretos."); 
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      toast.error("Erro ao conectar com o servidor.");
    }
  };

  return (
    <Card>
      <Logo />
      <Form onSubmit={handleLogin}>
        <h1>Acessar conta</h1>
        <Input
          placeholder="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          placeholder="Senha"
          name="pass"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <Button text="Entrar" type="submit" />
      </Form>
      <p className="toggle-link">
        Não tem conta? <Link to="/register">Crie uma aqui</Link>
      </p>
    </Card>
  );
}

export default Login;
