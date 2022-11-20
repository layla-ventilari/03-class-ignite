import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

/**
 * Porque um component renderiza?
 * Hooks changed
 * Props changed
 * Parent rendered
 * 
 * QUual é o fluxo de renderização?
 * 1. React recria o HTML da interface daquele component.
 * 2.Compara a versão HTML recriada com a anterior
 * 3. SE mudou alguma coisa, ele reescreve o HTML na tela
 * 
 * Memo:
 * 0.Hooks changed, Props changed (deep comparasion)
 * 0.1: Compara a versão anterior dos hooks e Props
 * 0.2: SE mudou algo, ele vai permitir a nova renderização
 */


const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm(){
  const fetchTransactions = useContextSelector(
    TransactionsContext, 
    (context) =>{
    return context.fetchTransactions
  })

  const {
    register, 
    handleSubmit,
    formState: {isSubmitting}
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })
      

  async function handleSearchTransactions(data: SearchFormInputs){
   await fetchTransactions(data.query) 
  }
  return(
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input type="text" 
      placeholder="Busque por transações" 
      {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20}/>
      </button>
    </SearchFormContainer>

  )
}
