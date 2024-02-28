const fs = require('fs/promises')

async function escreverArquivoAsyncAwait(nomeArquivo, dados) {
  console.log(`Escrevendo dados no arquivo ${nomeArquivo}...`)
  try {
    await fs.writeFile(nomeArquivo, dados)
    console.log(`Dados escritos no arquivo ${nomeArquivo} com sucesso.`)
  } catch (error) {
    console.error(`Erro ao escrever dados no arquivo ${nomeArquivo}:`, error)
  }
}

async function lerArquivoAsyncAwait(nomeArquivo) {
  console.log(`Lendo dados do arquivo: ${nomeArquivo}`)
  try {
    const dados = await fs.readFile(nomeArquivo, 'utf-8')
    console.log(`Dados lidos do arquivo ${nomeArquivo}, dados`)
  } catch (error) {
    console.error(`Erro ao ler dados do arquivo ${nomeArquivo}`, error)
  }
}

async function getPokemonDataWithAsyncAwait() {
  try {
    console.log('Aguardando retorno da Poke API')
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/1')
    const data = await response.json()

    const pokemonInfo = {
      nome: data.name,
      tipos: data.types.map(type => type.type.name),
      peso: data.weight,
      altura: data.height
    }

    const pokemonData = JSON.stringify(pokemonInfo, null, 2)
    await fs.writeFile('pokemon.json', pokemonData)
    console.log('Pokemon cadastrado')

    const dadosArquivoLocal = await fs.readFile('dados.txt', 'utf-8')
    console.log(`conteudo do arquivo dados.txt`, dadosArquivoLocal)

    const dadosPokemonSalvo = await fs.readFile('pokemon.json', 'utf-8')
    console.log('Conteudo do arquivo Pokemon', dadosPokemonSalvo)
  } catch (error) {
    console.error('Erro ao ler dados do pokemon', error)
  }
}

getPokemonDataWithAsyncAwait()
