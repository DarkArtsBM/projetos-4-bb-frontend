"use client";

import { Box, Button, Input, VStack, HStack, Text, Heading, Flex, SimpleGrid, Badge } from "@chakra-ui/react";
import { FiTrash2, FiCheck, FiX, FiShield, FiVideo, FiHeadphones, FiUsers } from "react-icons/fi";
import { useAdminDashboard } from "@/features/admin/hooks/useAdminDashboard";
import { withAdminAuth } from "@/hooks/withAdminAuth";

export function AdminDashboardViewRaw() {
    const { estados, acoes } = useAdminDashboard();

    return (
        <Flex minH="100vh" bg="gray.50" direction={{ base: "column", md: "row" }}>

            {/* MENU LATERAL */}
            <VStack w={{ base: "full", md: "250px" }} bg="gray.900" p={6} align="start" gap={4} color="white">
                <Heading size="md" mb={6} color="blue.300">Painel Admin</Heading>

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
            </VStack>

            {/* ÁREA DE CONTEÚDO */}
            <Box flex="1" p={8} maxW="1000px" mx="auto">

                {/* ABA 1: TUTORIAIS */}
                {estados.abaAtiva === "TUTORIAIS" && (
                    <VStack align="start" gap={8} w="full">
                        <Heading size="lg" color="gray.800">Gerenciar Tutoriais</Heading>

                        <Box p={6} bg="white" shadow="sm" borderRadius="lg" w="full" borderWidth="1px">
                            <Text fontWeight="bold" color="gray.800" mb={4}>Adicionar Novo Processo</Text>
                            <HStack w="full" gap={4}>
                                <Input color="gray.800" placeholder="Pergunta (ex: Como acessar o e-mail?)"
                                       value={estados.form.novaPergunta} onChange={(e) =>
                                    acoes.setNovaPergunta(e.target.value)} />

                                <Input color="gray.800" placeholder="URL do YouTube"
                                       value={estados.form.novaUrl} onChange={(e) =>
                                    acoes.setNovaUrl(e.target.value)} />

                                <Button colorPalette="blue" onClick={acoes.criarTutorial} loading={estados.form.carregandoForm}>Salvar</Button>
                            </HStack>
                        </Box>

                        <SimpleGrid columns={1} gap={4} w="full">
                            {estados.tutoriais.map(tut => (
                                <HStack key={tut.id} color="gray.800" p={4} bg="white" shadow="sm" borderRadius="md" borderWidth="1px" justify="space-between">
                                    <Box>
                                        <Text fontWeight="bold">{tut.pergunta}</Text>
                                        <Text fontSize="sm" color="gray.500">{tut.youtubeUrl}</Text>
                                    </Box>
                                    <Button colorPalette="red" variant="ghost" onClick={() => acoes.deletarTutorial(tut.id)}>
                                        <FiTrash2 /> Deletar
                                    </Button>
                                </HStack>
                            ))}
                        </SimpleGrid>
                    </VStack>
                )}

                {/* ABA 2: MODERAÇÃO DE ÁUDIOS */}
                {estados.abaAtiva === "MODERACAO" && (
                    <VStack align="stretch" gap={12} w="full">

                        {/* === SEÇÃO 1: FILA DE APROVAÇÃO === */}
                        <VStack align="start" gap={4} w="full">
                            <Heading size="lg" color="gray.800">Fila de Aprovação</Heading>

                            {estados.audiosPendentes.length === 0 ? (
                                <Text color="gray.500">Nenhum áudio aguardando moderação no momento. Tudo limpo! ✨</Text>
                            ) : (
                                <SimpleGrid columns={1} gap={4} w="full">
                                    {estados.audiosPendentes.map((audio: any) => (
                                        <Flex key={audio.id} p={4} bg="white" shadow="sm" borderRadius="lg" borderWidth="1px" direction="column" gap={4}>
                                            <HStack justify="space-between">
                                                <VStack align="start" gap={0}>
                                                    <Text fontWeight="bold">Autor: <Text as="span" color="blue.600">{audio.nomeAutor}</Text></Text>
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

                            {!estados.audiosAprovados || estados.audiosAprovados.length === 0 ? (
                                <Text color="gray.500">Nenhum áudio publicado ainda.</Text>
                            ) : (
                                <SimpleGrid columns={1} gap={4} w="full">
                                    {estados.audiosAprovados.map((audio: any) => (
                                        <HStack key={audio.id} p={4} bg="blue.50" borderRadius="md" justify="space-between" w="full">
                                            <Box>
                                                <Text fontWeight="bold">{audio.nomeAutor}</Text>
                                                <Text fontSize="sm">{audio.idioma} - Tutorial #{audio.tutorialId || audio.idTutorial || "N/A"}</Text>
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
                                <HStack key={user.id} p={4} bg="white" shadow="sm" borderRadius="md" borderWidth="1px" justify="space-between">
                                    <Box>
                                        <Text fontWeight="bold">
                                            {user.nome}
                                            {user.cargo === "ADMIN" && <Badge colorPalette="green" ml={2}>ADMIN</Badge>}
                                        </Text>
                                        <Text fontSize="sm" color="gray.500">{user.email}</Text>
                                    </Box>

                                    <HStack gap={2}>
                                        {/* Botão de Promover (Sempre aparece) */}
                                        {user.cargo !== "ADMIN" && (
                                            <Button colorPalette="purple" size="sm" onClick={() => acoes.promoverUsuario(user.id, user.nome)}>
                                                <FiShield /> Promover
                                            </Button>
                                        )}

                                        {/*  Botão Supremo: Só aparece se o alvo for ADMIN E o logado for SUPER_ADMIN */}
                                        {user.cargo === "ADMIN" && estados.cargoLogado === "SUPER_ADMIN" && (
                                            <Button colorPalette="red" variant="outline" size="sm" onClick={() => acoes.rebaixarUsuario(user.id, user.nome)}>
                                                Remover Poderes
                                            </Button>
                                        )}
                                    </HStack>
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