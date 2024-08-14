'use client'
import React, { useState } from 'react';
import './marketcar.css';

interface ICurso {
  id: number;
  titulo: string;
  preco: number;
}

interface IShoppingItem {
  produto: ICurso;
  quantidade: number;
}

const cursos: ICurso[] = [
  { id: 1, titulo: 'Iphone 12', preco: 3500.00 },
  { id: 2, titulo: 'Samsung S23', preco: 4000.00 },
  { id: 3, titulo: 'Iphone 14', preco: 4500.00 },
  { id: 4, titulo: 'Samsung S22', preco: 2900.00 }
];

const formatarPreco = (preco: number): string => preco.toFixed(2);

const MarketCar: React.FC = () => {
  const [shoppingCurso, setShoppingCurso] = useState<IShoppingItem[]>([]);

  const handleAddCurso = (id: number) => {
    const curso = cursos.find((curso) => curso.id === id);
    if (!curso) return;

    const cursoExisteShopping = shoppingCurso.find(item => item.produto.id === id);

    if (cursoExisteShopping) {
      const newShoppingCurso: IShoppingItem[] = shoppingCurso.map(item => {
        if (item.produto.id === id) {
          return {
            ...item,
            quantidade: item.quantidade + 1
          };
        }
        return item;
      });
      setShoppingCurso(newShoppingCurso);
    } else {
      const carItem: IShoppingItem = {
        produto: curso,
        quantidade: 1
      };
      setShoppingCurso([...shoppingCurso, carItem]);
    }
  };

  const handleRemoveCurso = (id: number) => {
    const ExisteCursoShopping = shoppingCurso.find((item) => item.produto.id === id);

    if (ExisteCursoShopping && ExisteCursoShopping.quantidade > 1) {
      const newShoppingCurso: IShoppingItem[] = shoppingCurso.map(item => {
        if (item.produto.id === id) {
          return {
            ...item,
            quantidade: item.quantidade - 1
          };
        }
        return item;
      });
      setShoppingCurso(newShoppingCurso);
    } else {
      const newShoppingCurso: IShoppingItem[] = shoppingCurso.filter(item => item.produto.id !== id);
      setShoppingCurso(newShoppingCurso);
    }
  };

  const totalCurso = shoppingCurso.reduce((total, item) => {
    return total + (item.produto.preco * item.quantidade);
  }, 0);

  const printNotaFiscal = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (!printWindow) return;
    printWindow.document.write('<html><head><title>Nota Fiscal</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1>Nota Fiscal</h1>');
    printWindow.document.write('<h2>Produtos Comprados</h2>');
    printWindow.document.write('<ul>');

    shoppingCurso.forEach(item => {
      printWindow.document.write(`<li>${item.produto.titulo} - R$ ${formatarPreco(item.produto.preco)} x ${item.quantidade} = R$ ${formatarPreco(item.produto.preco * item.quantidade)}</li>`);
    });

    printWindow.document.write('</ul>');
    printWindow.document.write(`<h2>Valor Total: R$ ${formatarPreco(totalCurso)}</h2>`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="marketcar-container">
      <header className="marketcar-header">
        <h1>Loja de Celulares</h1>
      </header>
      <section className="marketcar-products">
        <h2>Produtos Disponíveis</h2>
        <ul className="marketcar-product-list">
          {cursos.map(curso => (
            <li className="marketcar-product-item" key={curso.id}>
              <div className="marketcar-product-info">
                <h3 className="marketcar-product-title">{curso.titulo}</h3>
                <p className="marketcar-product-price">R$ {formatarPreco(curso.preco)}</p>
              </div>
              <button className="marketcar-button" onClick={() => handleAddCurso(curso.id)}>Adicionar</button>
            </li>
          ))}
        </ul>
      </section>
      <section className="marketcar-cart">
        <h2>Carrinho</h2>
        <ul className="marketcar-cart-list">
          {shoppingCurso.map(item => (
            <li className="marketcar-cart-item" key={item.produto.id}>
              <div className="marketcar-cart-info">
                <p><strong>Título:</strong> {item.produto.titulo}</p>
                <p><strong>Preço:</strong> R$ {formatarPreco(item.produto.preco)}</p>
                <p><strong>Quantidade:</strong> {item.quantidade}</p>
                <p><strong>Total:</strong> R$ {formatarPreco(item.produto.preco * item.quantidade)}</p>
              </div>
              <button className="marketcar-button" onClick={() => handleRemoveCurso(item.produto.id)}>Remover</button>
            </li>
          ))}
        </ul>
        <p className="marketcar-total-price"><strong>Valor Total:</strong> R$ {formatarPreco(totalCurso)}</p>
        <button className="marketcar-button" onClick={printNotaFiscal}>Imprimir Nota Fiscal</button>
      </section>
    </div>
  );
};

export default MarketCar;
