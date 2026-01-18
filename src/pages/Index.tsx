import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type Screen = 'welcome' | 'amount' | 'payment' | 'processing' | 'success' | 'history';

interface Transaction {
  id: string;
  amount: number;
  date: string;
  method: string;
  status: 'success' | 'failed';
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [amount, setAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleNumberClick = (num: string) => {
    if (amount.length < 10) {
      setAmount(amount + num);
    }
  };

  const handleBackspace = () => {
    setAmount(amount.slice(0, -1));
  };

  const handleClear = () => {
    setAmount('');
  };

  const handlePayment = (method: string) => {
    setPaymentMethod(method);
    setCurrentScreen('processing');
    
    setTimeout(() => {
      const newTransaction: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        amount: parseFloat(amount),
        date: new Date().toLocaleString('ru-RU'),
        method: method,
        status: 'success'
      };
      setTransactions([newTransaction, ...transactions]);
      setCurrentScreen('success');
    }, 2000);
  };

  const handleNewPayment = () => {
    setAmount('');
    setPaymentMethod('');
    setCurrentScreen('amount');
  };

  const WelcomeScreen = () => (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in">
      <div className="mb-12">
        <svg width="200" height="80" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="80" rx="8" fill="#21A038"/>
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="28" fontWeight="700" fontFamily="Roboto">
            СБЕРБАНК
          </text>
        </svg>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-center">Добро пожаловать!</h1>
      <p className="text-muted-foreground text-lg mb-12 text-center max-w-md">
        Выберите действие для продолжения работы с терминалом
      </p>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <Button 
          onClick={() => setCurrentScreen('amount')} 
          className="h-20 text-xl font-medium bg-primary hover:bg-primary/90"
        >
          <Icon name="CreditCard" size={28} className="mr-3" />
          Оплата картой
        </Button>
        <Button 
          onClick={() => setCurrentScreen('amount')} 
          className="h-20 text-xl font-medium bg-primary hover:bg-primary/90"
          variant="outline"
        >
          <Icon name="QrCode" size={28} className="mr-3" />
          Оплата по QR-коду
        </Button>
        <Button 
          onClick={() => setCurrentScreen('history')} 
          className="h-20 text-xl font-medium"
          variant="outline"
        >
          <Icon name="History" size={28} className="mr-3" />
          История операций
        </Button>
      </div>
    </div>
  );

  const AmountScreen = () => (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={() => setCurrentScreen('welcome')} className="text-lg">
          <Icon name="ArrowLeft" size={24} className="mr-2" />
          Назад
        </Button>
        <h2 className="text-2xl font-bold">Введите сумму</h2>
        <div className="w-24"></div>
      </div>

      <Card className="mb-8 p-8 bg-muted/30">
        <div className="text-5xl font-bold text-center mb-2">
          {amount || '0'} ₽
        </div>
        <p className="text-center text-muted-foreground">Введите сумму платежа</p>
      </Card>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', '.'].map((num) => (
          <Button
            key={num}
            onClick={() => handleNumberClick(num)}
            className="h-20 text-3xl font-medium hover:scale-105 transition-transform"
            variant="outline"
          >
            {num}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button
          onClick={handleBackspace}
          className="h-16 text-xl"
          variant="outline"
        >
          <Icon name="Delete" size={24} className="mr-2" />
          Удалить
        </Button>
        <Button
          onClick={handleClear}
          className="h-16 text-xl"
          variant="outline"
        >
          <Icon name="X" size={24} className="mr-2" />
          Очистить
        </Button>
      </div>

      <Button
        onClick={() => amount && setCurrentScreen('payment')}
        disabled={!amount || parseFloat(amount) <= 0}
        className="h-16 text-xl font-medium bg-primary hover:bg-primary/90"
      >
        Продолжить
        <Icon name="ArrowRight" size={24} className="ml-2" />
      </Button>
    </div>
  );

  const PaymentMethodScreen = () => (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={() => setCurrentScreen('amount')} className="text-lg">
          <Icon name="ArrowLeft" size={24} className="mr-2" />
          Назад
        </Button>
        <h2 className="text-2xl font-bold">Способ оплаты</h2>
        <div className="w-24"></div>
      </div>

      <Card className="mb-8 p-6 bg-primary/5">
        <div className="flex justify-between items-center">
          <span className="text-lg text-muted-foreground">Сумма к оплате:</span>
          <span className="text-3xl font-bold text-primary">{amount} ₽</span>
        </div>
      </Card>

      <div className="flex flex-col gap-4">
        <Card 
          className="p-6 cursor-pointer hover:scale-[1.02] transition-transform hover:border-primary"
          onClick={() => handlePayment('Банковская карта')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="CreditCard" size={28} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Банковская карта</h3>
                <p className="text-muted-foreground">Оплата картой любого банка</p>
              </div>
            </div>
            <Icon name="ChevronRight" size={28} className="text-muted-foreground" />
          </div>
        </Card>

        <Card 
          className="p-6 cursor-pointer hover:scale-[1.02] transition-transform hover:border-primary"
          onClick={() => handlePayment('QR-код')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="QrCode" size={28} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Оплата по QR-коду</h3>
                <p className="text-muted-foreground">Быстрая оплата через камеру</p>
              </div>
            </div>
            <Icon name="ChevronRight" size={28} className="text-muted-foreground" />
          </div>
        </Card>

        <Card 
          className="p-6 cursor-pointer hover:scale-[1.02] transition-transform hover:border-primary"
          onClick={() => handlePayment('СБП')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Smartphone" size={28} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Система быстрых платежей</h3>
                <p className="text-muted-foreground">Перевод по номеру телефона</p>
              </div>
            </div>
            <Icon name="ChevronRight" size={28} className="text-muted-foreground" />
          </div>
        </Card>
      </div>
    </div>
  );

  const ProcessingScreen = () => (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in">
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8 animate-pulse">
        <Icon name="Loader2" size={48} className="text-primary animate-spin" />
      </div>
      <h2 className="text-3xl font-bold mb-4">Обработка платежа...</h2>
      <p className="text-muted-foreground text-lg text-center max-w-md">
        Пожалуйста, подождите. Платёж обрабатывается
      </p>
    </div>
  );

  const SuccessScreen = () => (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in">
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8 animate-scale-in">
        <Icon name="CheckCircle2" size={56} className="text-primary" />
      </div>
      <h2 className="text-3xl font-bold mb-4 text-primary">Оплата успешна!</h2>
      
      <Card className="p-8 mb-8 w-full max-w-md">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Сумма:</span>
            <span className="font-bold text-xl">{amount} ₽</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Способ оплаты:</span>
            <span className="font-medium">{paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Дата и время:</span>
            <span className="font-medium">{new Date().toLocaleString('ru-RU')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Номер операции:</span>
            <span className="font-medium text-sm">{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <Button 
          onClick={handleNewPayment}
          className="h-16 text-xl font-medium bg-primary hover:bg-primary/90"
        >
          <Icon name="Plus" size={24} className="mr-2" />
          Новая оплата
        </Button>
        <Button 
          onClick={() => setCurrentScreen('welcome')}
          className="h-16 text-xl font-medium"
          variant="outline"
        >
          <Icon name="Home" size={24} className="mr-2" />
          На главную
        </Button>
      </div>
    </div>
  );

  const HistoryScreen = () => (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={() => setCurrentScreen('welcome')} className="text-lg">
          <Icon name="ArrowLeft" size={24} className="mr-2" />
          Назад
        </Button>
        <h2 className="text-2xl font-bold">История операций</h2>
        <div className="w-24"></div>
      </div>

      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
            <Icon name="Receipt" size={48} className="text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-semibold mb-3">История пуста</h3>
          <p className="text-muted-foreground text-center max-w-md mb-8">
            Здесь будут отображаться все ваши операции
          </p>
          <Button 
            onClick={() => setCurrentScreen('amount')}
            className="h-16 text-xl font-medium bg-primary hover:bg-primary/90"
          >
            <Icon name="Plus" size={24} className="mr-2" />
            Создать платёж
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 overflow-y-auto">
          {transactions.map((transaction) => (
            <Card key={transaction.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.status === 'success' ? 'bg-primary/10' : 'bg-destructive/10'
                  }`}>
                    <Icon 
                      name={transaction.status === 'success' ? 'CheckCircle2' : 'XCircle'} 
                      size={24} 
                      className={transaction.status === 'success' ? 'text-primary' : 'text-destructive'}
                    />
                  </div>
                  <div>
                    <div className="font-bold text-xl mb-1">{transaction.amount} ₽</div>
                    <div className="text-sm text-muted-foreground">{transaction.method}</div>
                    <div className="text-xs text-muted-foreground">{transaction.date}</div>
                  </div>
                </div>
                <Icon name="ChevronRight" size={24} className="text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const screens = {
    welcome: <WelcomeScreen />,
    amount: <AmountScreen />,
    payment: <PaymentMethodScreen />,
    processing: <ProcessingScreen />,
    success: <SuccessScreen />,
    history: <HistoryScreen />
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[800px] shadow-2xl p-8 bg-white">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-8 pb-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                <Icon name="Building2" size={24} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-lg">Терминал СберБанк</div>
                <div className="text-xs text-muted-foreground">Версия 2.1.4</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('ru-RU', { 
                  day: 'numeric', 
                  month: 'long',
                  year: 'numeric' 
                })}
              </div>
              <div className="font-bold text-lg">
                {new Date().toLocaleTimeString('ru-RU', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden">
            {screens[currentScreen]}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Index;
