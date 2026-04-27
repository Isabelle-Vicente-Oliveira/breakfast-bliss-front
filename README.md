<p align="center"> 
  <img src=".github/logo.png" alt="Breakfast Bliss Logo" width="80px" height="80px">
</p>
<h1 align="center"> Breakfast Bliss - Front End</h1>
<h3 align="center"> Sistema para pedidos online de um restaurante </h3>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)
<h2 id="sobre-o-projeto"> :pencil: Sobre o Projeto</h2>

O Breakfast Bliss é uma plataforma de pedidos online desenvolvida para facilitar a experiência de consumo em restaurantes. O foco do projeto é oferecer uma interface intuitiva e fluida para que os clientes possam navegar pelo cardápio e realizar pedidos em tempo real.

Telas do Cliente

<p align="center"> 
  <img src=".github/telas(cliente).gif" alt="Apresentação das telas do projeto (Cliente)" width="80px" height="80px">
</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)
<h2 id="tecnologias"> 🛠️ Tecnologias Utilizadas</h2>

- Angular: Framework principal utilizado para a construção de uma SPA (Single Page Application) robusta, utilizando recursos modernos como Signals para gerenciamento de estado reativo e Standalone Components para uma arquitetura mais leve.
- TypeScript: Superset que adiciona tipagem estática ao JavaScript, garantindo maior segurança, melhor autocompletar e um código mais fácil de manter a longo prazo.
- Angular Material: Biblioteca de componentes de UI de alta qualidade, utilizada para garantir uma interface consistente, seguindo os princípios do Material Design e acelerando o desenvolvimento de componentes complexos como tabelas e formulários.
- RxJS: Biblioteca para programação reativa baseada em Observables, utilizada para lidar com chamadas assíncronas à API e fluxos de dados de forma eficiente.
- SCSS: Pré-processador CSS que permite o uso de variáveis, aninhamento e mixins, facilitando a organização dos estilos seguindo a metodologia BEM (Block Element Modifier).


<h2 id="estrutura"> Structuring 📂 Estrutura e Organização das Pastas</h2>

A arquitetura do projeto foi pensada para ser escalável e de fácil manutenção, seguindo o padrão de divisões por responsabilidades:

```bash
    src/
    ├── app/
    │   ├── core/           # Funcionalidades centrais (Singleton): Guards, Interceptors e Services Globais.
    │   │   ├── guards/      # Proteção de rotas (Ex: AuthGuard)
    │   │   ├── interceptors/# Interceptação de requisições HTTP (Ex: Injeção de Token)
    │   │   ├── interfaces/  # Contratos de dados (Interfaces TypeScript)
    │   │   └── services/    # Lógica de negócio e comunicação com API (Auth, Cart, Menu)
    │   │
    │   ├── features/       # Módulos de funcionalidades específicas da aplicação (Páginas).
    │   │   ├── auth/        # Fluxo de autenticação (Login e Registro)
    │   │   ├── home/        # Landing page e dashboard inicial
    │   │   ├── menu/        # Gerenciamento de cardápio (Lista, detalhes e formulários)
    │   │   └── admin/       # Área administrativa do sistema (Em breve)
    │   │
    │   ├── shared/         # Componentes e recursos compartilhados entre múltiplos módulos.
    │   │   └── components/  # Componentes reutilizáveis (Botões, Cards, Header, Footer, Toast, Cart)
    │   │
    │   ├── app.routes.ts   # Configuração central de roteamento
    │   ├── app.config.ts   # Configurações globais de providers e módulos
    │   └── app.ts          # Componente raíz da aplicação
    │
    ├── styles.scss         # Estilos globais e variáveis de tema
    └── main.ts             # Ponto de entrada da aplicação
```

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)
<h2 id="instalacao"> 🚀 Instalação e Configuração</h2>

 **Instale as dependências:**
    ```bash
    npm install
    ```


**Iniciar o Projeto**
```bash
ng serve
```

<h2 id="proximos-passos"> 🏁 Próximos Passos</h2>

O projeto continua em evolução ativa. As próximas funcionalidades planejadas são:

- **Módulo de Pedidos (Orders):** Implementação do fluxo de checkout completo, convertendo os itens do carrinho em pedidos registrados no banco de dados.
- **Integração de Pagamentos:** Desenvolvimento de interfaces para simulação de transações e integração com gateways de pagamento.
- **Histórico e Perfil do Cliente:** Painel exclusivo para o usuário acompanhar o status de pedidos em tempo real, consultar histórico de compras e gerenciar favoritos.
- **Painel Administrativo (Backoffice):** Implementação de dashboards para controle de estoque, gestão de usuários e monitoramento de pedidos pendentes.
- **Gestão de Insumos (CRUD de Ingredientes):** Interface completa para cadastro e controle de estoque de ingredientes, permitindo a personalização detalhada de cada item do menu.
- **Notificações em Tempo Real:** Implementação de alertas (Toasts ou Push) para informar o cliente sobre a mudança de status do pedido (ex: "Seu café está pronto!").