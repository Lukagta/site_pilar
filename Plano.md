# Plano de Execução - Pilar Medicina

> [!IMPORTANT]
> **Diretrizes Críticas:**
> 1. **Foco Estético:** Sempre seguir rigorosamente a `SKILL.md` para manter o design premium.
> 2. **Idioma:** Todas as informações e retornos devem ser obrigatoriamente em **Português**.

## ✅ Fase 1: Fundação e Estética (Concluído)
- [x] Implementação do Backend resiliente (Prisma/PostgreSQL).
- [x] Refinamento Estético Premium (**Luxury Clinical Editorial**) baseado na `SKILL.MD`.
- [x] Landing Page Dinâmica (Consumindo Médicos da API).
- [x] Versionamento do código (Git v1.0.0).

## 🚀 Fase 2: Área Administrativa (Em Andamento)
- [x] Criar Dashboard administrativo para gestão do Corpo Clínico.
- [x] Implementar upload de imagem com redimensionamento automático (Sharp/WebP).
- [x] Adicionar sistema de "Ativar/Desativar" profissional (Toggle).
- [x] Implementar edição completa dos dados de médicos já cadastrados.
- [x] Criar sistema de acesso para profissionais (auto-edição restrita, sem alterar foto).
- [x] Criar seção de "Dados da Clínica" para gerenciar WhatsApp, Endereço e Redes Sociais.
- [x] Implementar upload e troca da Logo da clínica via Dashboard.
- [x] Implementar Gestão de Especialidades (CRUD completo).
- [x] Criar página de descrição completa (/medico/:id) com bio e especialidades.

## 🛠 Detalhes Técnicos do Dashboard
- **Login**: Acesso restrito para o administrador.
- **Ordem**: Profissionais aparecem na landing page por ordem de cadastro (esquerda para direita).
- **Layout**: Responsivo, com fontes sobrepostas à imagem (conforme design atual).
- **Armazenamento**: Fotos otimizadas no servidor local.

## 🛠 Correções da Fase 2 (Concluído)
- [x] Retornar o campo CRM no formulário de médicos para campo livre (restringir a números apenas no login do profissional).
- [x] Retornar o campo Especialidade no formulário de médicos para campo livre.
- [x] Especialidades cadastradas via CRUD servirão apenas para apresentação na seção de Especialidades do site.

## ✍️ Fase 3: Sistema de Blog (Concluído)
- [x] Criar estrutura de banco de dados para postagens do Blog (relacionado ao médico).
- [x] Implementar CRUD de postagens no backend.
- [x] Criar interface no Dashboard para médicos e admins gerenciarem o Blog.
- [x] Adicionar seção "Blog e Novidades" na Landing Page consumindo os dados reiais.
- [x] Exibir os posts em ordem cronológica de atualização (mais recente primeiro).
- [x] Implementar visualização em carrossel (com setas para navegação lateral) mantendo a estética da SKILL.MD.

> [x] deve ser mantido no maximo 10 posts no carrossel. a pardir daí vai sendo deletado os mais antigos. 

> [x] deixe uma opção de dawloade do blog pelo medico no seu dashboard. ele so pode fazer download do proprio post que ele criou.

> [x] O administrador na are administrativa deve ter a opção de editar ou/e fazer dowload do blog de qualquer medico.


## 🆕 Fase 5: Ajustes de Layout e Textos Dinâmicos (Concluído)
- [x] O texto "Proxima Vaga, Hoje as 14:30h" na Landing Page deve se tornar editável pelo administrador na área de "Dados da Clínica".
- [x] Permitir que a página se ajuste também para dispositivos mobiles.
- [x] Corrigir: adicionar especialidade em "gerenciar especialidades" não esta funcionando.



> adicionar uma botão, ativar/desativar Widget "Próxima Vaga" na pagina inicial. 

> ao clicar no enterço/localização na pagina inicial, deve abrir o google maps com a localização da clinica. 

> ao clicar no botao ao lado de agendar, abre uma seção onde o usuario pode escolher entre 2 opções. Area do paciente, Area do Profissional. isso substitui o botão de login que esta no rodapé.

