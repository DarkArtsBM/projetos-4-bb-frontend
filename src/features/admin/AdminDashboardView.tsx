"use client";

import { Box, Button, Input, VStack, HStack, Text, Heading, Flex, SimpleGrid, Badge, NativeSelect, Stack } from "@chakra-ui/react";
import { FiTrash2, FiCheck, FiX, FiShield, FiVideo, FiHeadphones, FiUsers, FiGlobe } from "react-icons/fi";
import { useAdminDashboard } from "@/features/admin/hooks/useAdminDashboard";
import { withAdminAuth } from "@/hooks/withAdminAuth";

export function AdminDashboardViewRaw() {
    const { estados, acoes } = useAdminDashboard();

    return (
        <Flex minH="100vh" bg="gray.50" direction={{ base: "column", md: "row" }}>

            {/* MENU LATERAL / NAVEGAÇÃO MOBILE */}
            <Box
                w={{ base: "full", md: "250px" }}
                bg="gray.900"
                p={{ base: 4, md: 6 }}
                color="white"
            >
                {/* Título - Escondido no mobile para ganhar espaço */}
                <Heading size="md" mb={6} color="blue.300" display={{ base: "none", md: "block" }}>
                    Painel Admin
                </Heading>

                {/* VISÃO DESKTOP (VStack - Vertical) */}
                <VStack display={{ base: "none", md: "flex" }} align="start" gap={4}>
                    <Button w="full" justifyContent="start" variant={estados.abaAtiva === "TUTORIAIS" ? "solid" : "ghost"} colorPalette="blue" onClick={() => acoes.setAbaAtiva("TUTORIAIS")}>
                        <FiVideo style={{ marginRight: '8px' }} /> Tutoriais
                    </Button>
                    <Button w="full" justifyContent="start" variant={estados.abaAtiva === "MODERACAO" ? "solid" : "ghost"} colorPalette="green" onClick={() => acoes.setAbaAtiva("MODERACAO")}>
                        <FiHeadphones style={{ marginRight: '8px' }} /> Moderação
                        {estados.audiosPendentes.length > 0 && <Badge colorPalette="red" ml={2} borderRadius="full">{estados.audiosPendentes.length}</Badge>}
                    </Button>
                    <Button w="full" justifyContent="start" variant={estados.abaAtiva === "USUARIOS" ? "solid" : "ghost"} colorPalette="purple" onClick={() => acoes.setAbaAtiva("USUARIOS")}>
                        <FiUsers style={{ marginRight: '8px' }} /> Usuários
                    </Button>
                    <Button w="full" justifyContent="start" variant={estados.abaAtiva === "IDIOMAS" ? "solid" : "ghost"} colorPalette="orange" onClick={() => acoes.setAbaAtiva("IDIOMAS")}>
                        <FiGlobe style={{ marginRight: '8px' }} /> Idiomas
                    </Button>
                </VStack>

                {/* VISÃO MOBILE (HStack - Scroll Horizontal) */}
                <HStack
                    display={{ base: "flex", md: "none" }}
                    overflowX="auto"
                    gap={2}
                    pb={2}
                    css={{ '&::-webkit-scrollbar': { display: 'none' } }}
                >
                    <Button size="sm" flexShrink={0} variant={estados.abaAtiva === "TUTORIAIS" ? "solid" : "outline"} colorPalette="blue" onClick={() => acoes.setAbaAtiva("TUTORIAIS")}>
                        Tutoriais
                    </Button>
                    <Button size="sm" flexShrink={0} variant={estados.abaAtiva === "MODERACAO" ? "solid" : "outline"} colorPalette="green" onClick={() => acoes.setAbaAtiva("MODERACAO")}>
                        Moderação {estados.audiosPendentes.length > 0 && `(${estados.audiosPendentes.length})`}
                    </Button>
                    <Button size="sm" flexShrink={0} variant={estados.abaAtiva === "USUARIOS" ? "solid" : "outline"} colorPalette="purple" onClick={() => acoes.setAbaAtiva("USUARIOS")}>
                        Usuários
                    </Button>
                    <Button size="sm" flexShrink={0} variant={estados.abaAtiva === "IDIOMAS" ? "solid" : "outline"} colorPalette="orange" onClick={() => acoes.setAbaAtiva("IDIOMAS")}>
                        Idiomas
                    </Button>
                </HStack>
            </Box>

            {/* ÁREA DE CONTEÚDO */}
            <Box flex="1" p={8} maxW="1000px" mx="auto">

                {/* ABA 1: TUTORIAIS REFATORADA */}
                {estados.abaAtiva === "TUTORIAIS" && (
                    <VStack align="start" gap={8} w="full">
                        <Heading size="lg" color="gray.800">Gerenciar Tutoriais</Heading>

                        {/* FORMULÁRIO DE ADIÇÃO */}
                        <Box p={6} bg="white" shadow="sm" borderRadius="lg" w="full" borderWidth="1px">
                            <Text fontWeight="bold" color="gray.800" mb={4}>Adicionar Novo Processo</Text>

                            {/* Mudamos de HStack para Stack para empilhar no mobile (base) e alinhar no desktop (md) */}
                            <Stack direction={{ base: "column", md: "row" }} w="full" gap={4}>
                                <Input
                                    color="black"
                                    placeholder="Pergunta (ex: Como acessar o e-mail?)"
                                    value={estados.form.novaPergunta}
                                    onChange={(e) => acoes.setNovaPergunta(e.target.value)}
                                />

                                <Input
                                    color="black"
                                    placeholder="URL do YouTube"
                                    value={estados.form.novaUrl}
                                    onChange={(e) => acoes.setNovaUrl(e.target.value)}
                                />

                                <Button
                                    colorPalette="blue"
                                    onClick={acoes.criarTutorial}
                                    loading={estados.form.carregandoForm}
                                    px={8}
                                    w={{ base: "full", md: "auto" }} // Botão largo no mobile
                                >
                                    Salvar
                                </Button>
                            </Stack>
                        </Box>

                        {/* LISTA DE TUTORIAIS */}
                        <SimpleGrid columns={1} gap={4} w="full">
                            {estados.tutoriais.map(tut => (
                                <Flex
                                    key={tut.id}
                                    color="gray.800"
                                    p={4}
                                    bg="white"
                                    shadow="sm"
                                    borderRadius="md"
                                    borderWidth="1px"
                                    justify="space-between"
                                    align="center"
                                    direction={{ base: "column", sm: "row" }} // Vira coluna se o espaço acabar
                                    gap={4}
                                >
                                    <Box flex="1" minW="0" w="full">
                                        <Text fontWeight="bold" color="black" wordBreak="break-word">
                                            {tut.pergunta}
                                        </Text>
                                        <Text fontSize="sm" color="gray.500" truncate>
                                            {tut.youtubeUrl}
                                        </Text>
                                    </Box>

                                    <Button
                                        colorPalette="red"
                                        variant="ghost"
                                        size="sm"
                                        w={{ base: "full", sm: "auto" }}
                                        onClick={() => acoes.deletarTutorial(tut.id)}
                                    >
                                        <FiTrash2 style={{ marginRight: '4px' }} /> Deletar
                                    </Button>
                                </Flex>
                            ))}
                        </SimpleGrid>
                    </VStack>
                )}

                {/* ABA 2: MODERAÇÃO DE ÁUDIOS */}
                {estados.abaAtiva === "MODERACAO" && (
                    <VStack align="stretch" gap={12} w="full">

                        {/* BARRA DE FILTRO POR IDIOMA */}
                        <VStack align="start" p={4} bg="blue.50" borderRadius="xl" borderWidth="1px" borderColor="blue.100" gap={3}>
                            <Text fontWeight="bold" color="blue.800" fontSize="sm">Filtrar por Idioma:</Text>

                            {/* Flex wrap permite que os botões "quebrem" para a linha de baixo no celular */}
                            <Flex wrap="wrap" gap={2}>
                                <Button
                                    size="sm"
                                    borderRadius="full"
                                    variant={estados.filtroIdioma === "" ? "solid" : "outline"}
                                    colorPalette="blue"
                                    onClick={() => acoes.setFiltroIdioma("")}
                                    _active={{ transform: "scale(0.95)" }}
                                >
                                    Todos
                                </Button>

                                {estados.idiomas.map((lang: any) => (
                                    <Button
                                        key={lang.id}
                                        size="sm"
                                        borderRadius="full"
                                        variant={estados.filtroIdioma === lang.nome ? "solid" : "outline"}
                                        colorPalette="blue"
                                        onClick={() => acoes.setFiltroIdioma(lang.nome)}
                                        _active={{ transform: "scale(0.95)" }}
                                    >
                                        {lang.nome}
                                    </Button>
                                ))}
                            </Flex>
                        </VStack>

                        {/* === SEÇÃO 1: FILA DE APROVAÇÃO === */}
                        <VStack align="start" gap={4} w="full">
                            <Heading size="lg" color="gray.800">Fila de Aprovação</Heading>

                            {estados.audiosPendentes.filter((a: any) => !estados.filtroIdioma || a.idioma === estados.filtroIdioma).length === 0 ? (
                                <Text color="gray.500">Nenhum áudio aguardando moderação no momento. Tudo limpo! ✨</Text>
                            ) : (
                                <SimpleGrid columns={1} gap={4} w="full">
                                    {estados.audiosPendentes
                                        .filter((audio: any) => !estados.filtroIdioma || audio.idioma === estados.filtroIdioma)
                                        .map((audio: any) => (
                                            <Flex key={audio.id} p={4} bg="white" shadow="sm" borderRadius="lg" borderWidth="1px" direction="column" gap={4}>
                                                <HStack justify="space-between">
                                                    <VStack align="start" gap={0}>
                                                        {/* AUTOR NA COR PRETA PARA MAIOR DESTAQUE */}
                                                        <Text fontWeight="bold" color="black">Autor: {audio.nomeAutor}</Text>

                                                        {/* Idioma e Data formatada */}
                                                        <Text fontSize="sm" color="gray.700">Idioma: <strong>{audio.idioma}</strong></Text>
                                                        <Text fontSize="xs" color="gray.500">
                                                            Enviado em: {new Date(audio.dataCriacao).toLocaleDateString('pt-BR')} às {new Date(audio.dataCriacao).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                                        </Text>

                                                        <Text fontSize="xs" color="gray.400">ID do Tutorial: {audio.tutorialId}</Text>
                                                    </VStack>
                                                    <Badge colorPalette="blue" variant="subtle" px={2} borderRadius="md">
                                                        {audio.idioma?.toUpperCase()}
                                                    </Badge>
                                                </HStack>
                                                <audio src={audio.caminhoArquivo} controls style={{ width: '100%', height: '40px', borderRadius: '8px' }} />
                                                <HStack justify="flex-end" pt={2} gap={3}>
                                                    <Button colorPalette="red" variant="outline" size="sm" onClick={() => acoes.reprovarAudio(audio.id)}>
                                                        <FiX style={{ marginRight: '4px' }} /> Reprovar
                                                    </Button>
                                                    <Button colorPalette="green" size="sm" onClick={() => acoes.aprovarAudio(audio.id)}>
                                                        <FiCheck style={{ marginRight: '4px' }} /> Aprovar
                                                    </Button>
                                                </HStack>
                                            </Flex>
                                        ))}
                                </SimpleGrid>
                            )}
                        </VStack>

                        {/* === SEÇÃO 2: ÁUDIOS PUBLICADOS === */}
                        <VStack align="start" gap={4} w="full">
                            <Heading size="lg" color="gray.800">Áudios Publicados (No Ar)</Heading>

                            {estados.audiosAprovados.filter((a: any) => !estados.filtroIdioma || a.idioma === estados.filtroIdioma).length === 0 ? (
                                <Text color="gray.500">Nenhum áudio publicado ainda.</Text>
                            ) : (
                                <SimpleGrid columns={1} gap={4} w="full">
                                    {estados.audiosAprovados
                                        .filter((audio: any) => !estados.filtroIdioma || audio.idioma === estados.filtroIdioma)
                                        .map((audio: any) => (
                                            <HStack key={audio.id} p={4} bg="blue.50" borderRadius="md" justify="space-between" w="full">
                                                <Box>
                                                    {/* NOME DO AUTOR NA COR PRETA PARA MAIOR DESTAQUE */}
                                                    <Text fontWeight="bold" color="black">{audio.nomeAutor}</Text>

                                                    {/* Idioma e Data formatada */}
                                                    <Text fontSize="sm" color="gray.700">
                                                        Idioma: <strong>{audio.idioma}</strong> - Tutorial #{audio.tutorialId || audio.idTutorial || "N/A"}
                                                    </Text>
                                                    <Text fontSize="xs" color="gray.500">
                                                        Registrado em: {new Date(audio.dataCriacao).toLocaleDateString('pt-BR')} às {new Date(audio.dataCriacao).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                                    </Text>

                                                </Box>
                                                <HStack gap={4}>
                                                    <audio src={audio.caminhoArquivo} controls style={{ height: '30px' }} />
                                                    <Button colorPalette="red" size="sm" variant="ghost" onClick={() => acoes.excluirAudioPostado(audio.id)}>
                                                        <FiTrash2 /> Excluir
                                                    </Button>
                                                </HStack>
                                            </HStack>
                                        ))}
                                </SimpleGrid>
                            )}
                        </VStack>

                    </VStack>
                )}

                {/* ABA 3: USUÁRIOS */}
                {estados.abaAtiva === "USUARIOS" && (
                    <VStack align="start" gap={6} w="full">
                        <Heading size="lg" color="gray.800">Gerenciar Equipe</Heading>

                        <SimpleGrid columns={1} gap={4} w="full">
                            {estados.usuariosComuns.map((user: any) => (
                                <Flex
                                    key={user.id}
                                    p={4}
                                    bg="white"
                                    shadow="sm"
                                    borderRadius="lg"
                                    borderWidth="1px"
                                    justify="space-between"
                                    align="center"
                                    direction={{ base: "column", sm: "row" }}
                                    gap={4}
                                >
                                    {/* Box de Informações com flex="1" e minW="0" para permitir encolhimento */}
                                    <Box flex="1" minW="0" w="full">
                                        <Text fontWeight="bold" color="black" truncate>
                                            {user.nome}
                                            {user.cargo === "ADMIN" && <Badge colorPalette="green" ml={2}>ADMIN</Badge>}
                                        </Text>
                                        <Text fontSize="sm" color="gray.500" truncate>
                                            {user.email}
                                        </Text>
                                    </Box>

                                    <HStack gap={2} w={{ base: "full", sm: "auto" }} justify="flex-end">
                                        {/* Botão de Promover */}
                                        {user.cargo !== "ADMIN" && (
                                            <Button
                                                colorPalette="purple"
                                                size="sm"
                                                w={{ base: "full", sm: "auto" }} // Botão largo no mobile
                                                onClick={() => acoes.promoverUsuario(user.id, user.nome)}
                                            >
                                                <FiShield /> Promover
                                            </Button>
                                        )}

                                        {/* Botão Remover Poderes */}
                                        {user.cargo === "ADMIN" && estados.cargoLogado === "SUPER_ADMIN" && (
                                            <Button
                                                colorPalette="red"
                                                variant="outline"
                                                size="sm"
                                                w={{ base: "full", sm: "auto" }}
                                                onClick={() => acoes.rebaixarUsuario(user.id, user.nome)}
                                            >
                                                Remover Poderes
                                            </Button>
                                        )}
                                    </HStack>
                                </Flex>
                            ))}
                        </SimpleGrid>
                    </VStack>
                )}

                {/* ABA 4: GERENCIAR IDIOMAS */}
                {estados.abaAtiva === "IDIOMAS" && (
                    <VStack align="start" gap={8} w="full">
                        <Heading size="lg" color="gray.800">Gerenciar Idiomas</Heading>

                        {/* Formulário de Cadastro */}
                        <Box p={6} bg="white" shadow="sm" borderRadius="lg" w="full" borderWidth="1px">
                            <Text fontWeight="bold" color="gray.800" mb={4}>Cadastrar Novo Idioma</Text>
                            <HStack w="full" gap={4}>
                                <Input
                                    color="black"
                                    bg="white"
                                    placeholder="Nome (ex: Espanhol)"
                                    value={estados.formIdioma.novoNomeIdioma}
                                    onChange={(e) => acoes.setNovoNomeIdioma(e.target.value)}
                                />

                                <Input
                                    color="black"
                                    bg="white"
                                    placeholder="Código (ex: es-ES)"
                                    value={estados.formIdioma.novoCodigoIdioma}
                                    onChange={(e) => acoes.setNovoCodigoIdioma(e.target.value)}
                                />

                                <Button
                                    colorPalette="orange"
                                    onClick={acoes.criarIdioma}
                                    loading={estados.form.carregandoForm}
                                >
                                    Salvar
                                </Button>
                            </HStack>
                        </Box>

                        {/* Lista de Idiomas Existentes */}
                        <SimpleGrid columns={1} gap={4} w="full">
                            {estados.idiomas.map((idioma: any) => (
                                <HStack
                                    key={idioma.id}
                                    p={4}
                                    bg="white"
                                    shadow="sm"
                                    borderRadius="md"
                                    borderWidth="1px"
                                    justify="space-between"
                                    color="gray.800"
                                >
                                    <Box>
                                        <Text fontWeight="bold" color="black">{idioma.nome}</Text>
                                        <Text fontSize="sm" color="gray.500">Código: {idioma.codigo}</Text>
                                    </Box>
                                    <Button
                                        colorPalette="red"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => acoes.deletarIdioma(idioma.id)}
                                    >
                                        <FiTrash2 /> Deletar
                                    </Button>
                                </HStack>
                            ))}
                        </SimpleGrid>
                    </VStack>
                )}

            </Box>
        </Flex>
    );
}

// Protege a rota com o High-Order Component
export const AdminDashboardView = withAdminAuth(AdminDashboardViewRaw);