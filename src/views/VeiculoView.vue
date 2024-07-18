<script setup>
import { ref, reactive, onMounted } from 'vue'
import VeiculosApi from '@/api/veiculos'
import ModelosApi from '@/api/modelos'
import AcessoriosApi from '@/api/acessorios'
import CoresApi from '@/api/cores'

const veiculosApi = new VeiculosApi()
const modelosApi = new ModelosApi()
const acessoriosApi = new AcessoriosApi()
const coresApi = new CoresApi()

const defaultVeiculo = { id: null, modelo: null, cor: null, acessorios: [], preco: 0.0 }

const veiculos = ref([])
const modelos = ref([])
const acessorios = ref([])
const cores = ref([])

const veiculo = reactive({ ...defaultVeiculo })

onMounted(async () => {
  veiculos.value = await veiculosApi.buscarTodosOsVeiculos()
  modelos.value = await modelosApi.buscarTodosOsModelos()
  acessorios.value = await acessoriosApi.buscarTodosOsAcessorios()
  cores.value = await coresApi.buscarTodasAsCores()
})

function limpar() {
  Object.assign(veiculo, { ...defaultVeiculo })
}

async function salvar() {
  if (veiculo.id) {
    await veiculosApi.atualizarVeiculo(veiculo)
  } else {
    await veiculosApi.adicionarVeiculo(veiculo)
  }
  veiculos.value = await veiculosApi.buscarTodosOsVeiculos()
  limpar()
}

function editar(veiculo_para_editar) {
  veiculo.modelo = veiculo_para_editar.modelo.id
  veiculo.cor = veiculo_para_editar.cor.id
  veiculo.acessorios = veiculo_para_editar.acessorios.map((acessorio) => acessorio.id)
  veiculo.preco = veiculo_para_editar.preco
}

async function excluir(id) {
  await veiculosApi.excluirVeiculo(id)
  veiculos.value = await veiculosApi.buscarTodosOsVeiculos()
  limpar()
}
</script>

<template>
  <h1>Veiculo</h1>
  <hr />
  <div class="form">
    <select v-model="veiculo.modelo">
      <option v-for="modelo in modelos" :key="modelo.id" :value="modelo.id">
        {{ modelo.nome }}
      </option>
    </select>
    <select v-model="veiculo.cor">
      <option v-for="cor in cores" :key="cor.id" :value="cor.id">
        {{ cor.nome }}
      </option>
    </select>
    <select multiple v-model="veiculo.acessorios">
      <option v-for="acessorio in acessorios" :key="acessorio.id" :value="acessorio.id">
        {{ acessorio.descricao }}
      </option>
    </select>
    <input type="number" v-model="veiculo.preco" placeholder="Preço" />
    <button @click="salvar">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
  <ul>
    <li v-for="veiculo in veiculos  " :key="veiculo.id">
      {{ veiculo.id }} - {{ modelos.filter(modelo => modelo.id == veiculo.modelo)[0]?.nome }} - {{ cores.filter(cor => cor.id == veiculo.cor)[0]?.nome }} -
      {{ acessorios.filter(acessorio => veiculo.acessorios.indexOf(acessorio.id) >= 0).map((acessorio) => acessorio.descricao).join(', ') }} - {{ veiculo.preco }}
      <button @click="editar(veiculo)">Editar</button>
      <button @click="excluir(veiculo.id)">Excluir</button>
    </li>
  </ul>
</template>
