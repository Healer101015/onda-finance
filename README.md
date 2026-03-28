# Onda Finance

Uma aplicação web moderna que simula um internet banking, desenvolvida para o Desafio Front-End da JobZ Talentos.

 **[Acesse a Aplicação Publicada Aqui](https://onda-finance-ten.vercel.app/)**

---

## Tecnologias e Stack Utilizada

O projeto foi construído respeitando 100% da stack obrigatória, complementada com ferramentas para elevar a fluidez da interface:

* **React 19 + TypeScript:** Base robusta e tipada para a interface.
* **Vite:** Bundler de alta performance.
* **Tailwind CSS v4 + CVA:** Estilização utilitária e gestão de variantes de componentes.
* **shadcn/ui + Radix UI:** Componentes acessíveis, semânticos e com design premium (Tema Zinc).
* **React Router Dom:** Gestão de rotas (Login e Dashboard).
* **Zustand:** Gestão de estado global leve e rápida (com persistência de sessão no `localStorage`).
* **React Hook Form + Zod:** Controlo de formulários e validação rigorosa de dados.
* **React Query + Axios:** Simulação de requisições assíncronas com tratamento de *loading* e *delay* de rede via *interceptors*.
* **Vitest:** Testes unitários do fluxo principal da aplicação.
* **Framer Motion:** Micro-interações e animações fluidas (Staggered lists, Spring physics).

---

## ⚙️ Como Rodar o Projeto

Siga os passos abaixo para executar o projeto localmente:

1. **Clone o repositório:**
  ```bash
  git clone https://github.com/SEU_USUARIO/onda-finance.git
  ```

2. **Acesse o diretório:**
  ```bash
  cd onda-finance
  ```

3. **Instale as dependências:**
  ```bash
  npm install
  ```

4. **Inicie o servidor de desenvolvimento:**
  ```bash
  npm run dev
  ```
  A aplicação estará disponível em `http://localhost:5173`

5. **Para rodar os testes (Vitest):**
  ```bash
  npm run test
  ```

---

##  Decisões Técnicas Adotadas

**Arquitetura Visual "App-Like":** O Dashboard foi construído para se comportar como uma aplicação nativa no Desktop. A página inteira é trancada (overflow-hidden) e apenas o histórico de transações possui um scroll interno com uma barra de rolagem customizada e não intrusiva. No Mobile, a aplicação adapta-se para um scroll vertical padrão, priorizando a UX tátil.

**Simulação Realista de API:** Em vez de apenas manipular o estado localmente, foi criada uma instância do Axios apontando para uma URL fictícia com um interceptor que adiciona um delay de 800ms. O React Query gere esta promessa, ativando os estados de loading e bloqueando múltiplos envios no botão de transferência.

**Design System Rigoroso:** Foram evitadas cores utilitárias forçadas (ex: bg-slate-50). O projeto utiliza integralmente as variáveis semânticas do shadcn/ui (ex: bg-background, text-muted-foreground), garantindo que o contraste seja perfeito e o código fique pronto para implementações futuras como o Dark Mode.

**Animações Funcionais:** O uso do Framer Motion foi aplicado de forma não obstrutiva para guiar a atenção do utilizador, utilizando o efeito cascata (stagger) na listagem de transações e transições físicas de "mola" (spring) para dar um feedback visual orgânico.

---

##  Segurança: Proteção da Aplicação

Num ambiente de produção real (backend e frontend integrados), o aplicativo bancário aplicaria as seguintes camadas de segurança:

### 1. Proteção contra Engenharia Reversa

* **Minificação e Obfuscação:** O processo de build (usando ferramentas como o Rollup via Vite) deve não apenas minificar o código, mas ofuscar nomes de variáveis e lógicas de negócio cruciais.
* **Ocultação de Source Maps:** Garantir que os ficheiros .map nunca sejam expostos no ambiente de produção para impedir que agentes maliciosos leiam o código-fonte legível e a estrutura de pastas originais.
* **Transferência de Lógica Sensível:** Regras de negócio, cálculos de taxas ou algoritmos de aprovação nunca devem residir no Frontend. O cliente deve funcionar apenas como uma camada de apresentação burra, solicitando validações sempre ao servidor.

### 2. Proteção contra Vazamento de Dados

* **HTTPS Strict Transport Security (HSTS):** Forçar toda a comunicação entre o cliente e o servidor através de canais encriptados (TLS), mitigando ataques de Man-in-the-Middle.
* **Gestão de Sessão Segura (Tokens & Cookies):** Abandonar o localStorage para armazenamento de dados sensíveis da sessão. Implementar Autenticação com JWT guardados em cookies HttpOnly, Secure e SameSite=Strict, tornando-os imunes a acessos via JavaScript (proteção direta contra XSS).
* **Content Security Policy (CSP):** Configurar cabeçalhos HTTP rigorosos para impedir que a aplicação carregue scripts, estilos ou iframes de domínios não autorizados.
* **Sanitização e Dupla Validação:** Embora o Zod garanta uma boa UX validando inputs no cliente, o Backend deve revalidar exaustivamente todos os payloads para evitar SQL Injections e aplicar sanitização contra Cross-Site Scripting (XSS) em todas as entradas.

---

##  Melhorias Futuras

Caso o projeto evoluísse, os próximos passos seriam:

* Integração com Backend Real: Substituir a camada simulada do Axios/React Query por chamadas a uma API RESTful ou GraphQL verdadeira.
* Testes End-to-End (E2E): Implementar testes de fluxo completo da interface com Playwright ou Cypress.
* Suporte a Dark Mode: Aproveitar as variáveis CSS já configuradas do shadcn/ui para adicionar a alternância de temas.
* Paginação / Infinite Scroll: Implementar paginação ou carregamento contínuo na listagem de transações caso o histórico fique muito denso.