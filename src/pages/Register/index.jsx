import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify"; // Importe
import "./style.css";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Logo from "../../components/Logo";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [nome, setNome] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      toast.warning("As senhas não coincidem!");
      return;
    }

    const cleanedEmail = email.trim();
    const cleanedSenha = senha.trim();

    try {
      const checkUser = await fetch(
        `https://6927085926e7e41498fca64b.mockapi.io/BioFit/users?email=${encodeURIComponent(cleanedEmail)}`
      );
      const existingUsers = await checkUser.json();

      if (existingUsers.length > 0) {
        toast.error("Este e-mail já está cadastrado!");
        return;
      }

      const novoUsuario = {
        nome, 
        email: cleanedEmail,
        pass: cleanedSenha,
        perfilCompleto: false,
      };

      const response = await fetch("https://6927085926e7e41498fca64b.mockapi.io/BioFit/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoUsuario),
      });

      if (response.ok) {
        const savedUser = await response.json();
        localStorage.setItem("usuario", JSON.stringify(savedUser));
        localStorage.setItem("user_id", savedUser.id);

        toast.success("Cadastro realizado! Complete seu perfil.");
        navigate("/CriarConta");
      } else {
        toast.error("Erro ao salvar no banco de dados.");
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro de conexão com o servidor.");
    }
  };

  return (
    <Card>
      <Logo />
      <Form onSubmit={handleSubmit}>
        <h1>Criar conta</h1>
        <Input
          placeholder="Nome"
          name="nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
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
        <Input
          placeholder="Confirme sua Senha"
          name="passConfirm"
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />

        <Button type="submit" text="Cadastrar" />
      </Form>
      <p className="toggle-link">
        Já possui conta? <Link to="/">Faça login</Link>
      </p>
    </Card>
  );
}

export default Register;
